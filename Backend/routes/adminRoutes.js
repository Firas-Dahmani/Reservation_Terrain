require('dotenv').config()
const router = require("express").Router()
const adminController = require("../Controller/adminController")
const verifyToken = require("../middlewares/verifyToken")
const verifyRole = require("../middlewares/verifyRole")

router.post('/addVille',verifyToken.protect, adminController.addVille)
router.get('/getVille', verifyToken.protect, adminController.showVille)
router.post('/addstade',verifyToken.protect,adminController.addStade)
router.get('/getstade', verifyToken.protect, adminController.getAllStade)
router.delete('/removeVille', verifyToken.protect, adminController.deleteVille)
router.delete('/removeStade', verifyToken.protect, adminController.deleteStade)
router.post('/seeUser', verifyToken.protect,verifyRole("Admin"), adminController.seeUser)
router.post('/acceptUser/:id', verifyToken.protect,verifyRole("Admin"), adminController.acceptUser)
router.post('/deleteUser/:id', verifyToken.protect,verifyRole("Admin"), adminController.deleteUser)
router.post('/addOwner', verifyToken.protect,verifyRole("Admin") , adminController.addOwner)


module.exports = router;