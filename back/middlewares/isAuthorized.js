const isAuthorized = (req, res, next) => {
    // This middleware checks if there is a session else send a status "401"
    if (req.session.adminLog) {
        next();
    } else {
        res.status(401).json({
            status:'401 Unauthorized',
            message:'User not logged in',
            data:''
        });
    }
}
module.exports = {
    isAuthorized
}
