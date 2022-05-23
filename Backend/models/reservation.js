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
    ville: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    prix: {
        type: Number,
        required: true
    },
    events: {
        type: Array,
        default:[]
    }
}) 

module.exports = mongoose.model('reservation', reservationSchema)