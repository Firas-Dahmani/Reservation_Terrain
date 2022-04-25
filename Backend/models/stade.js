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
    stadeId: {
        type: String,
        required: true
    },
    stadeName:{
        type: String, 
        required: true
    },
    stadetel: {
        type: Number,
        required: true
    },
    isAvail: {
        type: Boolean, default: false
    }
    //email pass
})
module.exports = mongoose.model('stade',stadeSchema)