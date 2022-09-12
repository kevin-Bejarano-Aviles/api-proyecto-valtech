//Require admin Model
const adminModel = require('../models/adminModel');
//Require bcrypt for password
const bcryptjs = require('bcryptjs');
//create a generic password
let pass = '123456789';
//create an admin user with values for admin table on mysql
const admin = {
    fullName : 'Sofia Serrano',
    email : 'sofiaSerrano@gmail.com',
    avatar : 'default.jpg',
    password : bcryptjs.hashSync(pass, 10)
}
console.log(admin.password);

//middleware exported
module.exports = async (req,res,next) => {
    //compare with a variable if admin already exist on the database
    const adminExist = await adminModel.findOne({
        where : {
            email : req.body.email
        }
    })
    //if admin doesn't exist it will create one and then will procede with the method login, but if admin exists it won't create it
    if(!adminExist){
        adminModel.create({
            fullName : admin.fullName,
            email : admin.email,
            avatar : admin.avatar,
            password : admin.password
        })
        next()
    }else{
        next()
    }
}