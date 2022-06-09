require('dotenv').config()
const User = require('../models/user')
const Ville = require('../models/Ville')
const Stade = require('../models/stade')
const ContactMessage = require('../models/Contact')
const nodemailer = require("nodemailer");
const cloudinary = require("../Utlis/cloudinary")
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcrypt');



let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.AUTH_EMAil, // generated ethereal user
      pass: process.env.AUTH_PASS, // generated ethereal password
    },
  });

// Home page 
// See user owner and player ==> accept -- delete user

exports.seeUser = async (req, res) => {

        await User.find({ role: 'User', isAvail: false})
        .then((result) => {
            res.json({
                status: "SUCCESS",
                message: "All users are available !",
                users : result
            })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while displaying users!"
            })
        })

}

exports.acceptUser = async (req, res) => {
    const { id } = req.params
    const {email} = req.body

     // send mail with defined transport object
     const mailOptions =  {
        from: process.env.AUTH_EMAil, // sender address
        to: email, // list of receivers
        subject: "Admin Accept Your Account ✔", // Subject line
        text: "Hey", // plain text body
        html: `    <p>Admin Accept your profile , you can use app now.</p><p>SoccerLand</p>`, // html body
    };

        await User.find({ _id : id })
        .then(()=> {
                User.updateOne({ _id: id }, { isAvail: true })
                .then(()=> {
                    transporter
                        .sendMail(mailOptions)
                        .then(()=> {
                            // email sent and verification record saved
                            res.json({
                                status: "SUCCESS",
                                message: "User acceptes successfuly!"
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({
                                status: "FAILED",
                                message: "Verification email failed!"
                            })
                        })
                })
                .catch(()=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while Updating user !"
                    })
                })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding user !"
            })
        })

}

exports.deleteUser = async (req, res) => {
    const { id } = req.params

    await User.find({ _id : id })
    .then(()=> {
            User.deleteOne({ _id: id }, { isAvail: true })
            .then(() =>{
                res.json({
                    status: "SUCCESS",
                    message: "User deleted successfuly !"
                })
            })
            .catch(()=> {
                res.json({
                    status: "FAILED",
                    message: "An error occured while Deleting user !"
                })
            })
    })
    .catch(() =>{
        res.json({
            status: "FAILED",
            message: "An error occured while finding user!"
        })
    })        
}

exports.addOwner = async (req, res) =>{
    // Checking if user already existe
    await User.find({email : req.body.email})
    .then( async (result) => {
        // A user aleady existe
        if(result.length){
            res.json({
                status: "FAILED",
                message: "User with the provided email already existes"
            })
        }else{
            const Pass = uuidv4()
            const user = new User({
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                tel: req.body.tel,
                birthDay: new Date(req.body.date),
                Genre: req.body.genre,
                adress: req.body.adress,
                Ville: req.body.ville,
                password: Pass,
                role: 'Owner',
                pic:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                isAvail:true,
                verified:true
            })

            await user.save()
            .then(userResult => {
                res.json({
                    status: "SUCCESS",
                    message: "Account saved successfuly !",
                    user : userResult,
                    Password : Pass
                })
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "An error occured while saving user account!"
                })
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            status: "FAILED",
            message: "An error occured while checking for existing user!"
        })
    })
}


// Add Ville 
exports.addVille = async (req, res) => {
    const {villeName} = req.body
    const VilleUpper = villeName.toUpperCase()
    if (!villeName){
        res.json({
            status: "FAILED",
            message: "Ville name not found!"
        })
    }

    await Ville.find({ villeName : VilleUpper })
        .then(villes => {
            if(villes.length > 0){
                res.json({
                    status: "FAILED",
                    message: "Ville name has been aded before!"
                })
            } else {
                const ville = new Ville({
                    villeName : villeName
                })
                ville.save()
                    .then((result)=> {
                        res.json({
                            status: "SUCCESS",
                            message: "Ville has been saved successfuly!",
                            ville : result
                        })
                    })
                    .catch(()=>{
                        res.json({
                            status: "FAILED",
                            message: "An error occured while saving ville!"
                        })
                    })
            }
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding ville!"
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

exports.deleteVille = async (req, res) => {
    const { id } = req.body

    await Ville.find({ _id : id })
    .then(async()=> {
            await Ville.deleteOne({ _id: id })
            .then(async() =>{
                await Stade.deleteMany({villeid : id})
                    .then(()=> {
                        res.json({
                            status: "SUCCESS",
                            message: "Ville deleted successfuly !"
                        })
                    })
                    .catch(()=> {
                        res.json({
                            status: "FAILED",
                            message: "An error occured while deliting stades !"
                        })
                    })
            })
            .catch(()=> {
                res.json({
                    status: "FAILED",
                    message: "An error occured while Deleting ville !"
                })
            })
    })
    .catch((err) => {
        console.log(err);
        res.json({
            status: "FAILED",
            message: "An error occured while finding ville !!"
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
                                .catch(()=> {
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
    const {Ville_ID} = req.body

    await Stade.find({ villeid: Ville_ID })
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

// User
exports.contactMessageView = async (req, res)=> {
    const { id } = req.body

    await User.find({_id : id})
        .then(async ()=> {
            await ContactMessage.find({})
                .then((result) => {
                    res.json({
                        status: "SUCCESS",
                        message: "Contact message finded successfuly ",
                        messages : result
                    })
                })
                .catch(()=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while finding contact message !!"
                    })
                })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding user !!"
            })
        })
}

exports.deleteMessage = async (req, res) => {
    const { MESSAGE_ID } = req.body

    await ContactMessage.find({})
        .then(async() => {
            await ContactMessage.deleteOne({_id : MESSAGE_ID})
                .then(()=> {
                    res.json({
                        status: "SUCCESS",
                        message: "Message deleted successfuly !!"
                    })
                })
                .catch(()=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while delting message !!"
                    })
                })
        })
        .catch(() => {
            res.json({
                status: "FAILED",
                message: "An error occured while finding contact message!"
            })
        })
}

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