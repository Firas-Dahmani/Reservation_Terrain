var mongoose = require('mongoose')
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
    
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true
    },
    birthDay: {
        type: Date, 
        default: Date.now
    },
    Genre: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    VilleID: {
        type: String,
        required: true,
    },
    Poste: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    isAvail: {
        type: Boolean, default: false
    },
    verified: {
        type: Boolean, default: false
    },
    equipes: {
        type: Array,
        default: []
    },
}, { timestamp: true }
)

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

module.exports = mongoose.model('user',userSchema)
