const User = require('../models/user')
const Ville = require('../models/Ville')
const Stade = require('../models/stade')
const { v4: uuidv4 } = require('uuid');

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

        await User.find({ _id : id })
        .then(()=> {
                User.updateOne({ _id: id }, { isAvail: true })
                .then(()=> {
                    res.json({
                        status: "SUCCESS",
                        message: "User acceptes successfuly!"
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
                role: 'User',
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
    const { id } = req.params

    await Ville.find({ _id : id })
    .then(()=> {
            Ville.deleteOne({ _id: id })
            .then(() =>{
                res.json({
                    status: "SUCCESS",
                    message: "Ville deleted successfuly !"
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

exports.getAllStade = async (req, res) => {

    try {
        await Stade.find({ villeid: req.body.id })
        .then(result => res.json({ message: result }))
    } catch (error) {
        console.log(error);
        res.json({ message: "some error!" })
    } 
}



exports.deleteStade =  async (req, res) => {
    const id = req.body.id
     try {
        await Stade.deleteOne({ _id: id })

        res.status(200).json({ msg: "yes deleted user by admin" })
    } catch (error) {
        res.json({ message: "Somthing went wrong in delete Stade!!" })
    }   
}

