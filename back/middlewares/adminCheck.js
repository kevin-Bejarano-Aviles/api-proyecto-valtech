const adminCheck = (req, res, next) => {
    // This middleware checks if there is a session else send a status "401"
    if (req.session.adminLog) {
        next();
    } else {
        res.status(401).json({ message: 'No estas logeado' });
    }
}
module.exports = {
    adminCheck
}
