const User = require('../models/user')
const Stade = require('../models/stade')
const Ville = require('../models/Ville')
const Reservation = require('../models/reservation')

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

exports.myProfile = async (req, res) => {
    try {
        User.findOne({ _id: req.user._id })
        .select("-password").select("-isAvail").select("-role")
        res.status(200).json({ user: user, msg: "all ok from myprofile" })
    } catch (error) {
        res.json({ message: "something went wrong!!" });
    }
}

exports.editProfile = (req, res) => {
    let emailchange;
    if (req.email == req.body.email) {
        emailchange = "no"
    }
    else {
        emailchange = "yes"
    }
    try {
        User.updateOne({ _id: req.user._id }, {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            tel: req.body.tel,
            birthDay: new Date(req.body.date),
            Genre: req.body.genre,
            adress: req.body.adress,
            Ville: req.body.ville,
            codePostal: req.body.codePostale,
            pic: uploadPic.secure_url,
        })
        res.status(201).json({ message: "edited profile", emailchange: emailchange });
    } catch (error) {
        res.json({ message: "something went wrong!!" });
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