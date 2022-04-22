const User = require('../models/user')
const Stade = require('../models/stade')
const Ville = require('../models/Ville')
const Reservation = require('../models/reservation')


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

 exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
        res.status(200).json(reservation)
    } catch (error) {
        res.status(404).json({message : "Reservation Not Found !"})
    }
}

exports.getAllReservation = async (req, res) => {
    const time = req.body.time
    const hour = req.body.hour 
    try {
        const reservations = await Reservation.find({ownerId: req.user._id, startTime : time, hours: hour, reservDate : {$gte:req.body.reservDate}})
        res.status(200).json(reservations)
    } catch (error) {
        res.status(404).json({message : " Some ERROR !"})
    }
}