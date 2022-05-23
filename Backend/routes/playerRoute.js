var express = require('express')
var router = express.Router()
const playerController = require('../Controller/playerController')
const verifyToken = require("../middlewares/verifyToken")
const verifyRole = require("../middlewares/verifyRole")

//Profile
router.post('/profile', verifyToken.protect,verifyRole("User"), playerController.profileUserView)
router.post('/updatepic', verifyToken.protect,verifyRole("User"), playerController.changePhoto)
router.post('/updateprofile', verifyToken.protect,verifyRole("User"), playerController.editProfile)

//Equipe
router.post('/search', verifyToken.protect,verifyRole("User"), playerController.searchUsers)
router.get('/equipe/:id', verifyToken.protect,verifyRole("User"), playerController.findUserById)
router.post('/equipe/delete/:id', verifyToken.protect,verifyRole("User"), playerController.deleteEquipe)
router.post('/addequipe', verifyToken.protect,verifyRole("User"), playerController.CreateGroupe)
router.post('/addmember', verifyToken.protect,verifyRole("User"), playerController.addMemberEquipe)
router.post('/seeequipe', verifyToken.protect,verifyRole("User"), playerController.SeeOwnEquipe)
router.post('/deleteuserfromequipe', verifyToken.protect,verifyRole("User"), playerController.deleteUserFromEquipe)

//search satde
router.get('/searchstade', verifyToken.protect,verifyRole("User"), playerController.SearchStade)
router.post('/createEvent', playerController.CreateEvent)
router.get('/getEvent', playerController.getEvent)


module.exports = router;