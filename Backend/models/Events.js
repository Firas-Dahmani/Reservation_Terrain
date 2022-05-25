var mongoose = require('mongoose')
var eventSchema = mongoose.Schema({
    UserId:String,
    OwnerId:String,
    StadeID:String,
    start:Date,
    end:Date,
    title : String,
    isAvail: {
        type: Boolean, 
        default: false
    }
})
module.exports = mongoose.model('event', eventSchema)