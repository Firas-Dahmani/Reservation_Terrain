const router = require('express').Router()
const ownerController = require("../Controller/ownerController")
const verifyToken = require("../middlewares/verifyToken")
const verifyRole = require("../middlewares/verifyRole")

//Profile
router.post('/profile', verifyToken.protect,verifyRole("Owner"), ownerController.profileUserView)
router.post('/updatepic', verifyToken.protect,verifyRole("Owner"), ownerController.changePhoto)
router.post('/updateprofile', verifyToken.protect,verifyRole("Owner"), ownerController.editProfile)

//Stade
router.post('/addOwnerstade', verifyToken.protect,verifyRole("Owner"), ownerController.addStade)
router.post('/getOwnerstade', verifyToken.protect,verifyRole("Owner"), ownerController.getAllStade)
router.post('/removeStade', verifyToken.protect,verifyRole("Owner"), ownerController.deleteStade)
router.post('/OwnergetEvent',  ownerController.OwnergetEvent)
router.post('/removeEvent/:id',  ownerController.deleteEvent)

//Ville
router.post('/getVille', ownerController.showVille)

module.exports = router;