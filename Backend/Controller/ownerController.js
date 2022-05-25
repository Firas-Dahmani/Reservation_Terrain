const User = require('../models/user')
const Stade = require('../models/stade')
const Ville = require('../models/Ville')
const Reservation = require('../models/reservation')
const cloudinary = require("../Utlis/cloudinary")
var bcrypt = require('bcrypt');
const Event = require('../models/Events')


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
    if(ville) objForUpdate.VilleID = ville
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

// Add Stade 
exports.addStade =  async (req, res) => {
    const {User_ID, Ville_ID, stadeName, Tel, description, prix, adress} = req.body
    const StadeUpper = stadeName.toUpperCase()

    await User.find({_id : User_ID})
        .then(async ()=> {
            await Ville.find({_id : Ville_ID})
            .then(async ()=> {
                await Stade.find({stadeName: StadeUpper })
                    .then((result)=> {
                        if(result.length > 0){
                            res.json({
                                status: "FAILED",
                                message: "Stade name has been aded !!"
                            })
                        } else {
                            const stade = new Stade ({
                                userId : User_ID,
                                villeid : Ville_ID, 
                                stadeName : stadeName, 
                                stadetel : Tel, 
                                desc: description,
                                prix: prix,
                                adress : adress
                            })
                            
                            stade.save()
                                .then((resultat)=> {
                                    res.json({
                                        status: "SUCCESS",
                                        message: "Ville has been saved successfuly!",
                                        stade : resultat
                                    })
                                })
                                .catch((err)=> {
                                    console.log(err);
                                    res.json({
                                        status: "FAILED",
                                        message: "An error occured while saving Stade !!"
                                    })
                                })
                        }
                    })
                    .catch((err)=> {
                        console.log(err);
                        res.json({
                            status: "FAILED",
                            message: "An error occured while finding Stade !!"
                        })
                    })
            })
            .catch(()=> {
                res.json({
                    status: "FAILED",
                    message: "An error occured while finding ville !!"
                })
            })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding User !!"
            })
        })
}

exports.getAllStade = async (req, res) => {
    const {Ville_ID, User_ID} = req.body

    await Stade.find({ villeid: Ville_ID , userId : User_ID})
        .then((result)=> {
            res.json({
                status: "SUCCESS",
                message: "Stade find successfuly!",
                stade : result
            })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding stade !"
            })
        })
}



exports.deleteStade =  async (req, res) => {
    const { id } = req.body

    await Stade.find({ _id : id })
    .then(()=> {
            Stade.deleteOne({ _id: id })
            .then(() =>{
                res.json({
                    status: "SUCCESS",
                    message: "Stade deleted successfuly !"
                })
            })
            .catch(()=> {
                res.json({
                    status: "FAILED",
                    message: "An error occured while Deleting Stade !"
                })
            })
    })
    .catch(() => {
        res.json({
            status: "FAILED",
            message: "An error occured while finding stade !!"
        })
    })   
}


// Show Ville 
exports.showVille =  async (req, res ) => {

    await Ville.find({})
        .then((result)=> {
            res.json({
                status: "SUCCESS",
                message: "Ville find successfuly!",
                ville : result
            })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding ville !"
            })
        })
}


exports.OwnergetEvent = async (req, res)=> {
    const {ownerid} = req.body 

    console.log(ownerid);
    await Event.find({
        OwnerId : ownerid
    })
    .then((result)=> {
        res.json({
            status: "SUCCESS",
            message: "event founded successfuly!!",
            event : result
        })
    })
    .catch(() => {
        res.json({
            status: "FAILED",
            message: "An error occured while finding event!!"
        })
    })
}

exports.deleteEvent = async (req, res) => {
    const { id } = req.body

        await Event.find({ _id : id })
        .then(()=> {
                Event.deleteOne({ _id: id })
                .then(()=> {
                    res.json({
                        status: "SUCCESS",
                        message: "Event deleted successfuly!"
                    })
                })
                .catch(()=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while Updating Event !"
                    })
                })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding Event !"
            })
        })

}


