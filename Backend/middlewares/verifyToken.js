require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.protect = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({
            status: "Unauthorized",
            message: "Not authorized, no token!"
        })
    }
    
    try {
        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = await User.findById(decoded.id).select("-password")
        req.role = req.user.role

        next()
    } catch (error) {
        res.status(401).json({
            status: "Unauthorized",
            message: "Not authorized, token failed!"
        })
    }

    
}