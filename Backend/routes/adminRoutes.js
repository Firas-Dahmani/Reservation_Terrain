require('dotenv').config()
const router = require("express").Router()
const adminController = require("../Controller/adminController")
const verifyToken = require("../middlewares/verifyToken")
const verifyRole = require("../middlewares/verifyRole")

//Ville
router.post('/addVille', verifyToken.protect,verifyRole("Admin"), adminController.addVille)
router.post('/getVille', verifyToken.protect,verifyRole("Admin"), adminController.showVille)
router.post('/removeVille/:id', verifyToken.protect,verifyRole("Admin"), adminController.deleteVille)

//Stade
router.post('/addstade', verifyToken.protect,verifyRole("Admin"), adminController.addStade)
router.get('/getstade', verifyToken.protect,verifyRole("Admin"), adminController.getAllStade)
router.post('/removeStade', verifyToken.protect,verifyRole("Admin"), adminController.deleteStade)

//User
router.post('/seeUser', verifyToken.protect,verifyRole("Admin"), adminController.seeUser)
router.post('/acceptUser/:id', verifyToken.protect,verifyRole("Admin"), adminController.acceptUser)
router.post('/deleteUser/:id', verifyToken.protect,verifyRole("Admin"), adminController.deleteUser)
router.post('/addOwner', verifyToken.protect,verifyRole("Admin") , adminController.addOwner)


module.exports = router;