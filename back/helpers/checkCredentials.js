const bcryptjs = require('bcryptjs');
const checkPassword = (pass,userPass) =>{
    return bcryptjs.compareSync(pass,userPass);
}
module.exports= {
    checkPassword
}