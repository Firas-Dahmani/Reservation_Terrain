const express = require('express')
const router = express.Router()
const authController = require('../Controller/authController')
const upload = require("../Utlis/multer")

router.post('/register', upload.single("pic"), authController.registerUser)
router.post('/login', authController.logIn)

module.exports = router;