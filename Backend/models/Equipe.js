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
    }
}
)

module.exports = mongoose.model('Equipe', equipeSchema)