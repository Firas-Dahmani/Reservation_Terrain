var mongoose = require('mongoose')
var equipeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    adminId: {
        type: String,
        required:true
    },
    members: {
        type: Array,
        default: []
    },
    createAt: {
        type: Date, 
        default: Date.now
    },
    isAdmin: {
        type: Boolean, default: true
    },
}
)

module.exports = mongoose.model('Equipe', equipeSchema)