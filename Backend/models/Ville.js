var mongoose = require('mongoose')


var villeSchema = mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    villeName: {
        type: String,
        required:true
    }
}
)

module.exports = mongoose.model('ville', villeSchema)