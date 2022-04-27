const verifyRole = (...alowedRoles) => {
    return (req, res, next) => {
        if(!req?.role) {
            res.json({
                status: "FAILED",
                message: "Not authorized, no access permissions"
            })
        }
        const rolesArray = [...alowedRoles]
        const result = rolesArray.includes(req.role)
        if(!result){
            res.json({
                status: "FAILED",
                message: "Not authorized, no access permissions"
            })
        }
        next()
    }
}

module.exports = verifyRole