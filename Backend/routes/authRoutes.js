const express = require('express')
const router = express.Router()
const authController = require('../Controller/authController')
const upload = require("../Utlis/multer")

router.post('/register', upload.single("pic"), authController.registerUser)
router.post('/login', authController.logIn)
router.get('/verify/:userId/:uniqueString', authController.verifyEmail)
router.get('/verified/:e', authController.EmailVerified)
router.post('/reqPasswordReset', authController.PasswordResetReq)
router.post('/PasswordResetDone', authController.resetPassword)

router.get('/getVille', authController.showVille)


module.exports = router;