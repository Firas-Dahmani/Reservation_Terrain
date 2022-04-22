const verifyRole = (...alowedRoles) => {
    return (req, res, next) => {
        if(!req?.role) {
            res.status(401).json({
                status: "Unauthorized",
                message: "Not authorized, no access permissions"
            })
        }
        const rolesArray = [...alowedRoles]
        const result = rolesArray.includes(req.role)
        if(!result){
            res.status(401).json({
                status: "Unauthorized",
                message: "Not authorized, no access permissions"
            })
        }
        next()
    }
}

module.exports = verifyRole