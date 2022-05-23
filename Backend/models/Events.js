var mongoose = require('mongoose')
var eventSchema = mongoose.Schema({
    start:Date,
    end:Date,
    title : String,
    isAvail: {
        type: Boolean, 
        default: false
    }
})
module.exports = mongoose.model('event', eventSchema)