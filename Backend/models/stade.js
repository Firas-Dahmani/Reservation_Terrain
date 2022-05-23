var mongoose = require('mongoose')
var stadeSchema = mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    villeid: {
        type: String,
        required: true
    },
    stadeName:{
        type: String, 
        uppercase: true,
        required: true
    },
    stadetel: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    prix: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    events: {
        type: Array,
        default:[]
    }
})
module.exports = mongoose.model('stade',stadeSchema)