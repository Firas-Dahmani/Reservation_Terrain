require('dotenv').config()
const Token = require('../Utlis/generateToken')
const User = require('../models/user')
const cloudinary = require("../Utlis/cloudinary")
var bcrypt = require('bcrypt');




exports.registerUser = async (req, res) =>{
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
            
            const uploadPic = await cloudinary.uploader.upload(req.body.pic || req.file.path , {
                public_id: Date.now()+"-"+req.body.firstname+"-"+req.body.lastname,
                folder:"photoProfile"
            })

            console.log(uploadPic);
            const user = new User({
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                tel: req.body.tel,
                birthDay: new Date(req.body.date),
                Genre: req.body.genre,
                adress: req.body.adress,
                Ville: req.body.ville,
                codePostal: req.body.codePostale,
                password: req.body.password,
                role: req.body.role,
                pic: uploadPic.secure_url,
            })

            await user.save()
            .then(userResult => {
                res.json({
                    status: "SUCCESS",
                    message: "Regiter successful",
                    data: userResult,
                    token: Token.generateToken(userResult._id)
                })
            })
            .catch(err => {
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

exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    
    await User.find({ email })
    .then(data => {
        if(data.length){
            const hashedPassword = data[0].password
            bcrypt.compare(password, hashedPassword)
            .then(result => {
                if(result){
                    res.json({
                        status: "SUCCESS",
                        message: "Login successful",
                        data: data,
                        token: Token.generateToken(data._id)
                    })
                }else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid Password entred!"
                    })
                }
            })
            .catch(e => {
                res.json({
                    status: "FAILED",
                    message: "An error occured while comparing Password!"
                })
            })
            
        }else{
            res.json({
                status: "FAILED",
                message: "Invalid Email entred!"
            })
        }
    })
    .catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while checking for existing user!"
        })
    })
}