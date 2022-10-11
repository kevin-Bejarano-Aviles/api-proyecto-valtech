const {Students:StudentModel} = require('../models');
const existingEmail = async(email)=>{
     const student = await StudentModel.findOne({
        where:{
            email:email
        },
        attributes:['email']
    });
    //console.log(student);
     if(student){
        throw new Error('Este email ya tiene una cuenta en nuestra base de datos');
    } 
};
const existingDni = async(dni)=>{
    const student = await StudentModel.findOne({
        where:{
            dni:dni
        },
        attributes:['dni']
    });
    if(student){
        throw new Error('Este dni ya existe en nuestra base de datos');
    }
};
const existingUser = async(user)=>{
    const student = await StudentModel.findOne({
        where:{
            user:user
        },
        attributes:['user']
    });
    if(student){
        throw new Error('Este usuario ya existe en nuestra base de datos');
    }
}
module.exports = {
    existingDni,
    existingEmail,
    existingUser
}
