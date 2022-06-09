const User = require('../models/user')
const Stade = require('../models/stade')
const Event = require('../models/Events')
const cloudinary = require("../Utlis/cloudinary")
var bcrypt = require('bcrypt');
const Equipe = require('../models/Equipe')
const moment = require('moment')
var mongoose = require('mongoose')


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


exports.CreateGroupe = async (req, res) => {
    const { groupeName, ADMINID} = req.body

    await User.find({_id : ADMINID})
        .then(async ()=> {
            let equipe = new Equipe({
                name: groupeName,
                adminId : ADMINID,
                isAdmin:true
            })

            await equipe.save()
                .then((result) => {
                    res.json({
                        status: "SUCCESS",
                        message: "Equipe Saved Successfuly ",
                        equipe : result
                    })
                })
                .catch(()=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while Saving Equipe !!!"
                    })
                })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding admin of groupe !!!"
            })
        })
}

exports.findUserById = async (req, res) => {
    const { id } = req.params

    await User.find({_id: id})
        .select("firstName")
        .select("lastName")
        .select("email")
        .select("tel")
        .select("birthDay")
        .select("Genre")
        .select("adress")
        .select("VilleID")
        .select("Poste")
        .select("pic")
        .select("equipes")
    .then((result)=> {
        res.json({
            status: "SUCCESS",
            message: "user founded successfuly",
            User: result
        })
    })
    .catch(()=> {
        res.json({
            status: "FAILED",
            message: "An error occured while finding user !!!"
        })
    })
}

exports.addMemberEquipe = async (req, res)=> {
    const {ADMINID, EQUIPEID, USERID} = req.body

     await Equipe.find({_id: EQUIPEID})
            .then(async (equipe)=> {
                if(equipe.length === 0){
                    res.json({
                        status: "FAILED",
                        message: "Cree une equipe pour ajouter le membres !!!"
                    })
                } else {
                    await User.find({_id : USERID})
                    .then(async (useraded)=> {
                        let checkUserInMemeber = false
                        
                        equipe[0].members.map((equipeSearch)=> {
                            if(equipeSearch.UserID.equals(USERID)  ){
                                checkUserInMemeber = true
                            }
                        })

                        if(checkUserInMemeber){
                            res.json({
                                status: "FAILED",
                                message: "User have been added "
                            })
                        } else {

                            await Equipe.updateOne(
                                {"$and":[{_id : EQUIPEID}, {adminId:ADMINID}]},
                                {$push: {members: {UserID:useraded[0]._id,Name:useraded[0].firstName,Pic:useraded[0].pic}}}
                            )
                            .then(async ()=> {
                                await User.updateOne(
                                    {_id : useraded[0]._id},
                                    {$push: {equipes: {_id:equipe[0]._id,name: equipe[0].name}}}
                                )
                                .then(()=> {
                                    res.json({
                                        status: "SUCCESS",
                                        message: "User Updated successfuly"
                                    })
                                })
                                .catch(()=> {
                                    res.json({
                                        status: "FAILED",
                                        message: "An error occured while update user !!!"
                                    })
                                })
                            })
                            .catch(()=> {
                                res.json({
                                    status: "FAILED",
                                    message: "An error occured while Adding the member !!!"
                                })
                            })
                        }

                    })
                    .catch((err)=> {
                        console.log(err);
                        res.json({
                            status: "FAILED",
                            message: "An error occured while finding Users !!!"
                        })
                    })
                }
            })
            .catch(()=> {
                res.json({
                    status: "FAILED",
                    message: "An error occured while finding Equipe !!!"
                })
            })
}

exports.deleteEquipe =  async (req, res) => {
    const { id } = req.params

    await Equipe.find({ _id : id })
    .then(async (equipe)=> {
            await Equipe.deleteOne({_id: id })
            .then(() =>{
                Promise.all(equipe[0].members.map(async (element)=> {
                    await User.updateOne({_id: element.UserID}, 
                        {
                            $pull: { equipes:{_id: equipe[0]._id} } 
                        }
                    );
                }))
                .then(()=> {
                    res.json({
                        status: "SUCCESS",
                        message: "Equipe deleted successfuly !"
                    })
                })
                
                
            })
            .catch((err)=> {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "An error occured while Deleting Equipe !"
                })
            })
    })
    .catch(() => {
        res.json({
            status: "FAILED",
            message: "An error occured while finding Equipe !!"
        })
    })   
}

exports.deleteUserFromEquipe = async (req, res) => {
    const {USERID, EQUIPEID} = req.body

    
    await Equipe.find({ _id : EQUIPEID })
        .then(async ()=> {
            await User.updateMany({_id: USERID}, 
                {
                    $pull: { equipes:{_id: new mongoose.Types.ObjectId(EQUIPEID)} }
                }
            ).then(async ()=> {
                await Equipe.updateMany({_id: EQUIPEID}, 
                    {
                        $pull: { members:{ UserID: new mongoose.Types.ObjectId(USERID)} }
                    }
                ).then(()=> {
                    res.json({
                        status: "SUCCESS",
                        message: "Member deleted successfuly !"
                    })
                })
                .catch((err)=> {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "An error occured while deleting user from Equipe !"
                    })
                })
            })
            .catch((err)=> {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "An error occured while deleting equipe from User !"
                })
            })
            
        })
        .catch((err)=>{
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while finding Equipe !"
            })
        })  
}



exports.searchUsers = async (req, res) => {
 
    const { Poste , playerName , ville , USERID} = req.body
    
    
    
    let Name = new RegExp(playerName, 'ig')
    let query = User.find({
        '$and':[
            {
                '$or': [
                    { firstName: Name }, 
                    { lastName: Name }
                ]
            },
            {role:'User'}
        ]
    })


    if (Poste !== null && Poste !== ""){
        query = query.regex('Poste', new RegExp(Poste,'i'))
    }

    if (ville !== null && ville !== ""){
        query = query.regex('VilleID', new RegExp(ville, 'ig'))
    }

    await User.find({_id : USERID})
        .then(async ()=> {
            await query
                .then((result)=> {
                    res.json({
                        status: "SUCCESS",
                        message: "Users find successfuly",
                        Users : result
                    })
                })
                .catch((err)=> {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "An error occured while searching User !!!"
                    })
                })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding User !!!"
            })
        })

}

exports.SeeOwnEquipe = async (req, res) => {
    const {USERID} = req.body

    await User.findById(USERID)
        .then(async (user)=> {
            await Equipe.find({adminId: user?._id})
                .then((result)=> {
                    res.json({
                        status: "SUCCESS",
                        message: "Equipe found successfuly!!",
                        equipe : result
                    })
                })
                .catch(()=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while finding Equipe!!"
                    })
                })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding User!!"
            })
        })
}

//Stade 
exports.SearchStade = async (req, res) => {
    const {USERID, stadename, villeID} = req.body


    let stadeNamesearch = new RegExp(stadename, 'ig')
    let querysearch = {}

    if (stadename !== null && stadename !== ""){
         querysearch.stadeName = stadeNamesearch
    }

    if (villeID !== null && villeID !== ""){
        querysearch.villeid = villeID
   }

    let query = Stade.find(querysearch)

    await User.findById(USERID)
        .then(async ()=> {
            await query
                .then((result)=> {
                    res.json({
                        status: "SUCCESS",
                        message: "Satde founded successfuly",
                        stade: result
                    })
                })
                .catch(()=> {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while finding satde!!"
                    })
                })
        })
        .catch((err)=> {
            console.log(err);
                res.json({
                    status: "FAILED",
                    message: "An error occured while finding User!!"
                })
        })
}

exports.CreateEvent = async (req, res) => {
    const {start, end, title, StadeID, ownerid , userid} = req.body

    console.log(end);
    console.log(start);

    await Event.find({
        '$and':[
            {start:{ $gte: moment(start).toDate() }},
            {end:{ $lte:moment(end).toDate()}}
        ]
        })
        .then(async (result)=> {
            console.log(result.length > 0 || moment(start).toDate() < Date.now() );
            if(result.length > 0){
                res.json({
                    status: "FAILED",
                    message: "This time have been reserved or out !!"
                })

            } else {
                const event = new Event({
                    UserId:userid,
                    OwnerId:ownerid,
                    StadeID,
                    start,
                    end,
                    title
                })
            
                await event.save()
                    .then(async (events)=> {
                        res.json({
                            status: "SUCCESS",
                            message: "User Added to Event successfuly",
                            events:events
                        })
                    })
                    .catch((err)=> {
                        console.log(err);
                        res.json({
                            status: "FAILED",
                            message: "An error occured while saving event!!"
                        })
                    })
            }
        })
        .catch((err)=> {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while finding event!!"
            })
        })
}

exports.getEvent = async (req, res)=> {
    const {userid, ownerid} = req.body 
    await Event.find({
        start: { $gte: moment(req.query.start).toDate() },
        end: { $lte: moment(req.query.end).toDate() },
        OwnerId : ownerid,
        UserId:userid
    })
    .then((result)=> {
        res.json({
            status: "SUCCESS",
            message: "event founded successfuly!!",
            event : result
        })
    })
    .catch((err) => {
        console.log(err);
        res.json({
            status: "FAILED",
            message: "An error occured while finding event!!"
        })
    })
}

exports.getStadeByID = async (req, res) => {
    const { id } = req.params

    await Stade.findById(id)
        .then((result)=> {
            res.json({
                status: "SUCCESS",
                message: "Stade founded successfuly!!",
                stade : result
            })
        })
        .catch(()=> {
            res.json({
                status: "FAILED",
                message: "An error occured while finding Stade!!"
            })
        })
}

exports.deleteEventUser = async (req, res) => {
    const { start , end } = req.body

        await Event.find({ start , end })
        .then((result)=> {
            console.log(result);
                Event.deleteOne({ _id: result[0]._id })
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
