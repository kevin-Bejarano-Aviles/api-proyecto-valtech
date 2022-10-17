const {adminById} = require('../helpers/findAdminBy');
const jwt = require('jsonwebtoken');
const isAuthorized = async(req, res, next) => {
    let token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            status:'401 Unauthorized',
            message: 'No hay token en la peticion',
            data:''
        });
    }
    try {
        token = token.split(' ');
        const { id } = jwt.verify(token[1],process.env.SECRET_SESSION);
        const admin = await adminById(id);
        if(!admin){
            return res.status(401).json({
                status:'401 Unauthorized',
                message: 'Invalid token user not found',
                data:''
            });
        }
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({
            status:'401 Unauthorized',
            message: 'Invalid token',
            data:''
        });
    }
}
module.exports = {
    isAuthorized
}