require('dotenv').config()
const router = require("express").Router()
const adminController = require("../Controller/adminController")
const verifyToken = require("../middlewares/verifyToken")
const verifyRole = require("../middlewares/verifyRole")

//Ville
router.post('/addVille', verifyToken.protect,verifyRole("Admin"), adminController.addVille)
router.post('/getVille', verifyToken.protect,verifyRole("Admin"), adminController.showVille)
router.post('/removeVille', verifyToken.protect,verifyRole("Admin"), adminController.deleteVille)

//Stade
router.post('/addstade', verifyToken.protect,verifyRole("Admin"), adminController.addStade)
router.post('/getstade', verifyToken.protect,verifyRole("Admin"), adminController.getAllStade)
router.post('/removeStade', verifyToken.protect,verifyRole("Admin"), adminController.deleteStade)

//User
router.post('/seeUser', verifyToken.protect,verifyRole("Admin"), adminController.seeUser)
router.post('/acceptUser/:id', verifyToken.protect,verifyRole("Admin"), adminController.acceptUser)
router.post('/deleteUser/:id', verifyToken.protect,verifyRole("Admin"), adminController.deleteUser)
router.post('/addOwner', verifyToken.protect,verifyRole("Admin") , adminController.addOwner)

//Profile
router.post('/profile', verifyToken.protect,verifyRole("Admin"), adminController.profileUserView)
router.post('/updatepic', verifyToken.protect,verifyRole("Admin"), adminController.changePhoto)
router.post('/messageContact', verifyToken.protect,verifyRole("Admin"), adminController.contactMessageView)
router.post('/deletemessageContact', verifyToken.protect,verifyRole("Admin"), adminController.deleteMessage)
router.post('/updateprofile', verifyToken.protect,verifyRole("Admin"), adminController.editProfile)


module.exports = router;