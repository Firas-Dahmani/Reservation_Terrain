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
    }
})
module.exports = mongoose.model('stade',stadeSchema)