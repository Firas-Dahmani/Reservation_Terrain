var mongoose = require('mongoose')
var villeSchema = mongoose.Schema({
    villeName: {
        type: String,
        uppercase: true,
        required:true
    }})
module.exports = mongoose.model('ville', villeSchema)