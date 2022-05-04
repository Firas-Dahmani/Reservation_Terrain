var express = require('express')
var router = express.Router()
const playerController = require('../Controller/playerController')
const verifyToken = require("../middlewares/verifyToken")
const verifyRole = require("../middlewares/verifyRole")

//Profile
router.post('/profile', verifyToken.protect,verifyRole("User"), playerController.profileUserView)
router.post('/updatepic', verifyToken.protect,verifyRole("User"), playerController.changePhoto)
router.post('/updateprofile', verifyToken.protect,verifyRole("User"), playerController.editProfile)

module.exports = router;