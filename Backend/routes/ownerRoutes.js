const router = require('express').Router()
const ownerController = require("../Controller/ownerController")
const verifyToken = require("../middlewares/verifyToken")

router.post("/addReservation", verifyToken.protect, ownerController.addReservation )
router.get("/allReservation", verifyToken.protect, ownerController.getAllReservation )
router.get("/Reservation/:id", verifyToken.protect, ownerController.getReservationById )

module.exports = router;