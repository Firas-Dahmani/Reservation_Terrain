const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema({
    userId : {
        type: String,
        required : true
    },
    stadeId: {
        type: String,
        required: true
    },
    reservDate: {
        type: Date, 
        default: Date.now
    },
    startTime: {
        type: String,
        required: true
    },
    endTime : {
        type: String,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    isAvail: {
        type: Boolean, default: true
    }
}) 

module.exports = mongoose.model('reservation', reservationSchema)