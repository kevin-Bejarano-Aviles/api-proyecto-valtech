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
            address,
            motive,
            user,
            password:passHash          
        });
        res.json({message:'Registro creado correctamente'});
    } catch (error) {
        res.json({message:'Error'})
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
        res.json({message:error.message})
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