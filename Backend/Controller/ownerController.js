const User = require('../models/user')
const Stade = require('../models/stade')
const Ville = require('../models/Ville')
const Reservation = require('../models/reservation')
const cloudinary = require("../Utlis/cloudinary")
var bcrypt = require('bcrypt');


/// User 
exports.profileUserView = async (req, res) => {
    const { USER_ID } = req.body

    await User.find({_id: USER_ID})
    .select("-password").select("-isAvail")
        .then((result)=> {
            res.json({
                status: "SUCCESS",
                message: "User finded successfuly !!",
                User : result
            })
        })
        .catch((err)=> {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while finding user Profile !!"
            })
        })
}

exports.changePhoto = async (req, res) => {
    const { USER_ID } = req.body

    await User.find({_id : USER_ID})
        .then(async ()=> {
            const uploadPic = await cloudinary.uploader.upload(req.body.pic , {
                public_id: USER_ID,
                folder:"photoProfile"
            })
            await User.updateOne({_id : USER_ID}, {
                pic: uploadPic.secure_url
            }).then(()=> {
                    res.json({
                        status: "SUCCESS",
                        message: "Update pic successfuly !!"
                    })
                })
                .catch(()=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while Update pic!!"
                    })
                })
        })
        .catch((err)=> {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while finding user!!"
            })
        })
}

exports.editProfile = async (req, res) => {
    const {
        USER_ID,
        firstName,
        lastName,
        email, 
        tel,
        date,
        genre,
        adress,
        ville,
        password
    } = req.body

    let objForUpdate = {}

    if(firstName) objForUpdate.firstName = firstName
    if(lastName) objForUpdate.lastName = lastName
    if(email) objForUpdate.email = email
    if(tel) objForUpdate.tel = tel
    if(date) objForUpdate.birthDay = date
    if(genre) objForUpdate.Genre = genre
    if(adress) objForUpdate.adress = adress
    if(ville) objForUpdate.Ville = ville
    if(password) objForUpdate.password = password

    await User.find({_id: USER_ID})
        .then(async (user)=> {
            if(password){
                const saltRounds = 10
                bcrypt.hash(password, saltRounds)
                    .then((hashedPassword)=> {
                        User.updateOne({_id: USER_ID}, {password:hashedPassword})
                            .then(()=> {
                                // both user record and reset record updated
                                res.json({
                                    status: "SUCCESS",
                                    message: "Password has been reset successufly"
                                })
                            })
                            .catch(()=> {
                                res.json({
                                    status: "FAILED",
                                    message: "An error occured while finalizing password reset!"
                                })
                            }) 
                    })
                    .catch((err)=> {
                        console.log(err);
                        res.json({
                            status: "FAILED",
                            message: "An error occured while hashing password !"
                        })
                    })
            } else {
                await User.updateOne({ _id: USER_ID}, {$set : objForUpdate}, { omitUndefined: 1})
                .then(()=> {
                    res.json({
                        status: "SUCCESS",
                        message: "User updated successfuly !!"
                    })
                })
                .catch((err)=> {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "An error occured while Updating user !!"
                    })
                })
            }
            
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while finding user !!!"
            })
        })
}

// Create Reservation
exports.addReservation = async (req, res) => {
    
    try {
        const {
            stadeid,
            reservDate,
            startTime,
            endTime,
            ville,
            hours,
            prix
        } = req.body

        await User.find({_id: req.user._id})
        await Stade.find({_id: req.body.stadeid})
        const reservation = await new Reservation({
            userId : req.user._id,
            stadeId : stadeid,
            reservDate : reservDate,
            startTime: startTime,
            endTime:endTime,
            ville:ville,
            hours:hours,
            prix : prix
        })
        await reservation.save()
        res.json({message : "Reservation added"});
    } catch (error) {
        console.log(error);
        res.status(404).json({message : "some error while adding Reservation by Center Owner"});
    }

}

exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
        res.status(200).json(reservation)
    } catch (error) {
        res.status(404).json({message : "Reservation Not Found !"})
    }
}

exports.getAllReservation = async (req, res) => {
    try {
        const reservation = await Reservation.find({ownerId: req.user._id})
        res.status(200).json(reservation)
    } catch (error) {
        res.status(404).json({message : " Some ERROR !"})
    }
}

// Stade 

// Add Stade 
exports.addStade =  async (req, res) => {
    await Ville.find({_id : req.body.villeid})
    .catch(result => res.status(404).json({ messsage: "some error in finding ville id!" }))
       
       await Stade.find({ villeid: req.body.villeid }, async (err, s) => {
           if (err) {
               res.json({ msg: "some error in finding stade!" });
           }
       else {
           let stade = new Stade ({
               userId : req.user._id,
               villeid : req.body.villeid, 
               stadeId : s.length + 1,
               stadeName : req.body.stadename, 
               stadetel : req.body.stadetel
           })

           await stade.save((error, st) => {
               if (error){
                   console.log(error);
                   res.json({ messsage: "some error in save!" });
               }
               else {
                   res.status(200).json({ message: "Stade added!!" })
               }
           })
       }
   })
}

// update Stade
exports.updateStade = async (req, res) => {
 
   const stade = await Stade.findById(req.params.id);
 
   if (stade.userId.toString() !== req.user._id.toString()) {
     res.status(401);
     throw new Error("You can't perform this action");
   }
 
   if (stade) {
       stade.villeid = req.body.villeid
       stade.stadeName = req.body.stadename 
       stade.stadetel = req.body.stadetel
 
     const updatedStade = await stade.save();
     res.json(updatedStade);
   } else {
     res.status(404);
     throw new Error("Stade not found");
   }
 };

exports.getAllStade = async (req, res) => {

   try {
       await Stade.find({ userId: req.user._id , villeid: req.body.id })
       .then(result => res.json({ message: result }))
   } catch (error) {
       console.log(error);
       res.json({ message: "some error!" })
   } 
}

// Show Ville 
exports.showVille =  async (req, res ) => {
    try {
        await Ville.find({}).then(v => res.json(v))
    } catch (error) {
        console.log(error);
        res.status(404).json({message : "some error while finding Ville by admin"});
    }
}