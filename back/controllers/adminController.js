//Require models and associations of the db
const {adviserModel,eventModel,studentModel} = require('../models/associations') 
const AdminModel = require('../models/adminModel');
const NewsModel = require('../models/newsModel');
//Require bcryptjs
const bcryptjs = require('bcryptjs');
//Require express validator 
const { validationResult } = require('express-validator');

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
            return res.status(401).json({message:'Credenciales invalidas'});
        }
        if(!bcryptjs.compareSync(pass,admin.password)){
            return res.status(401).json({message:'Credenciales invalidas'});
        }
        req.session.adminLog={
            id:admin.id,
            fullName:admin.fullName,
            avatar: admin.avatar
        }
        let theAdmin = req.session.adminLog;
        res.json(theAdmin);

    } catch (error) {
        res.status(500).json(error.message)
    }
};

const addStudent = (req,res)=>{
    const {fullName,email,phoneNumber,program,dni,school,age,address,motive,user,pass} = req.body;
    const avatar = req.files[0].filename;
    const passHash = bcryptjs.hashSync(pass,12);
    let errors = validationResult(req);
    console.log(errors);
    if(errors.isEmpty()){
        try {
        studentModel.create({
            fullName : fullName,
            email : email,
            phoneNumber: phoneNumber,
            program : program,
            avatar : avatar,
            dni : dni,
            school : school,
            age : age,
            address : address,
            motive : motive,
            user : user,
            password:passHash          
        });
        res.json({message:'Registro creado correctamente'});
    } catch (error) {
        res.status(500).json({message:'Error'})
    }
    }else{
        res.json(errors.mapped());
    }
    

};

const getAllStudent = async(req,res)=>{
    try {
        const students = await studentModel.findAll();
        res.json(students)
    } catch (error) {
        res.json({message:'Error'})
    }
};

const getStudent = async (req,res) => {
    try {
        const student = await studentModel.findAll({
            where : {id : req.params.id},
            attributes : ['id','fullName','email','phoneNumber','program','avatar','dni','school','age','address','motive','user'],
           include : [{model:adviserModel,attributes:['id','fullName','email','phoneNumber']} ,{model:eventModel,attributes:['id','name','date','time','detail','duration','adviser_event_id']}]  
        })
        res.json(student[0])
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

const logOut = (req=request,res)=>{
       
       req.session.destroy((err) => {
        res.clearCookie('userId').send('cleared cookie');//encontrado en stack overflow,no lo se explicar
     });
       
};  

module.exports = {
    addStudent,
    getAllStudent,
    getStudent,
    login,
    logOut
};