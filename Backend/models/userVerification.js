var mongoose = require('mongoose')
var userVerificationSchema = mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    uniqueString: {
        type: String,
        required:true
    },
    createAt: {
        type: Date,
        required:true
    },
    expiredAt: {
        type: Date,
        required:true
    }})
module.exports = mongoose.model('userVerification', userVerificationSchema)