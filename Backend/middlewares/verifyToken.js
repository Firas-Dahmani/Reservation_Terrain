const jwt = require('jsonwebtoken')
const user = require('../models/user')

exports.protect = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Not authorized, token failed")
    }
    let token = req.headers.authorization.split(' ')[1]

    if (token == 'null') {
        return res.status(401).send("Not authorized, token failed")
    }
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await user.findById(decoded.id).select("-password");

    if (!decoded) {
        return res.status(401).send("Not authorized, token failed")
    }
   
    next()
}

