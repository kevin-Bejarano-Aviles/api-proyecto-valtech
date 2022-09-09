const {adviserModel,eventModel,studentModel} = require('../models/associations') 
const AdminModel = require('../models/adminModel');
const NewsModel = require('../models/newsModel');
const bcryptjs = require('bcryptjs');

const login = async(req,res)=>{
    const {email,pass} = req.body;
    //const passHash = bcryptjs.hashSync(pass,12);
    try {
        const admin = await AdminModel.findOne({
            where:{
                email:email
            }
        });
        if(!admin){
            return res.json({message:'Credenciales invalidas'});
        }else{
            res.json(admin);
        }
        /* if(bcryptjs.compareSync(pass,admin.password)){
            return res.json({message:'Credenciales invalidas'});
        } */

    } catch (error) {
        res.json({message:'Error'})
    }
}

const addStudent = (req,res)=>{
    const {fullName,email,phoneNumber,program,avatar,dni,school,age,addres,motive,user,pass} = req.body;
    const passHash = bcryptjs.hashSync(pass,12);
    try {
        studentModel.create({
            fullName,
            email,
            phoneNumber,
            program,
            avatar,
            dni,
            school,
            age,
            addres,
            motive,
            user,
            password:passHash          
        });
        res.json({message:'Registro creado correctamente'});
    } catch (error) {
        res.json({message:'Error'})
    }

}

const getAllStudent = async(req,res)=>{
    try {
        const students = await studentModel.findAll();
        res.json(students)
    } catch (error) {
        res.json({message:'Error'})
    }
}

module.exports = {
    addStudent,
    getAllStudent,
    login
}