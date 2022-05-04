const router = require('express').Router()
const ownerController = require("../Controller/ownerController")
const verifyToken = require("../middlewares/verifyToken")
const verifyRole = require("../middlewares/verifyRole")

//Profile
router.post('/profile', verifyToken.protect,verifyRole("Owner"), ownerController.profileUserView)
router.post('/updatepic', verifyToken.protect,verifyRole("Owner"), ownerController.changePhoto)
router.post('/updateprofile', verifyToken.protect,verifyRole("Owner"), ownerController.editProfile)

module.exports = router;