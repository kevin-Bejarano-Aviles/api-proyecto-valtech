const jwt = require('jsonwebtoken');
const generateJWT = ( id ) => {
    const payload = {id};
    const token = jwt.sign(payload,process.env.SECRET_SESSION,{
        expiresIn:process.env.JWT_EXPIRES
    });
    return token
}
module.exports = {
    generateJWT
}