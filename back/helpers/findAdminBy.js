const {Admins:AdminModel} = require('../models');
const adminById = async(id)=>{
    const admin = await AdminModel.findOne({
        where:{
            id:id
        }
    });
    return admin;
};
const adminByEmail = async(email) =>{
    const admin = await AdminModel.findOne({
        where:{
            email:email
        }
    });
    return admin;
};
module.exports = {
    adminByEmail,
    adminById
}