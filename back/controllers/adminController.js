//Require models and associations of the db
const { adviserModel, eventModel, studentModel,studentsEventsModel } = require('../models/associations');
/* const studentEventModel = require('../models/studentEvent') */
const AdminModel = require('../models/adminModel');
const NewsModel = require('../models/newsModel');
const db = require('../database/db');
const fs = require('fs');
const path = require('path');
const {Op} = require('sequelize');
//Require bcryptjs
const bcryptjs = require('bcryptjs');
//Require express validator 
const { validationResult } = require('express-validator');

//Method to login our admin
const login = async (req, res) => {
    const { email, pass } = req.body;
    //const passHash = bcryptjs.hashSync(pass,12);
    try { 
         // We use the email to login, if our model find the email will comparate with the password, else we'll see the message "Credenciales inválidas"
        const admin = await AdminModel.findOne({
            where: {
                email: email
            }

        });
        if (!admin) {
            return res.status(400).json({ message: 'Credenciales invalidas' });
        } // We compare the password entered with the password we have in the db that's already hashed, with method "compareSync" 
        if (!bcryptjs.compareSync(pass, admin.password)) {
            return res.status(400).json({ message: 'Credenciales invalidas' });
        }
        req.session.adminLog = {
            id: admin.id,
            fullName: admin.fullName,
            avatar: admin.avatar,
            email: admin.email
        }
        let theAdmin = req.session.adminLog;
        res.json(theAdmin);

    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

//Method to add a student
const addStudent = async (req, res) => {
    const { fullName, email, phoneNumber, program, dni, school, age, address, motive, user, pass } = req.body;
    //If validationResult of "errors" is empty can create a new student, else we will see the error
    let errors = validationResult(req);
    //console.log(errors);
    if (errors.isEmpty()) {
        try {
            const avatar = req.files[0].filename;
            const passHash = bcryptjs.hashSync(pass, 12); // We use method "hashSync" to hash the password entered
            await db.query("ALTER TABLE students AUTO_INCREMENT = 1"); // This line is to reset id so our deletes ids can use the deleted ones
            await studentModel.create({
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                program: program,
                avatar: avatar,
                dni: dni,
                school: school,
                age: age,
                address: address,
                motive: motive,
                user: user,
                password: passHash
            });
            res.json({ message: 'Registro creado correctamente' });
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    } else {
        res.status(400).json(errors.mapped());
        // If we have an image will assign avatar
        if(typeof req.files[0] != 'undefined'){
            const avatar = req.files[0].filename;
            fs.unlinkSync(path.join(__dirname,'..','..','front','src','img','students',`${avatar}`));
        }
    }
};

//Method to get all students
const getAllStudent = async (req, res) => {
    try {
        const students = await studentModel.findAll({attributes:{exclude : ['password']}}); // excludes just one item
        res.json(students);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

//Method to get one student
const getStudent = async (req, res) => {
    try {
        const student = await studentModel.findAll({
            where: { id: req.params.id },
            attributes: ['id', 'fullName', 'email', 'phoneNumber', 'program', 'avatar', 'dni', 'school', 'age', 'address', 'motive', 'user'],
            include: [{ model: adviserModel, attributes: ['id', 'fullName', 'email', 'phoneNumber'] }, { model: eventModel, attributes: ['id', 'name', 'date', 'time', 'detail', 'duration', 'adviser_event_id'] }]
        })
        if(!student[0]){
            return res.status(404).json({message:'404 user not found'});
        }
        res.json(student[0]);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

//Method to log out
const logOut = (req = request, res) => {
        req.session.destroy((err) => {
        res.clearCookie('userId').send('cleared cookie');//If we add "send" it works, we don't know why
    });

};
//Method to get all the advisers
const getAllAdvisers = async (req,res) => {
    
    try {
        const advisers = await adviserModel.findAll();
        res.json(advisers)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
const prueba =async(req,res)=>{
    try {
        const estudiantes = [{
            id:1
        },{
            id:2
        },{
            id:3
        }];
        const even = await eventModel.create({
            name:'asdasdasd',
            detail:'hola qeu tal',
            adviser_event_id:2
        }); 
        estudiantes.forEach(async(element)=>{
            const student = await studentModel.findOne({
                where:{
                    id:element.id
                }
            });
             await even.addStudent(student); 
            console.log(student);
        })
        
        
        /* const evetn = await eventModel.findAll({
            include:{
                model:studentEventModel
            }
        })
        res.json(evetn) */
        res.json('evento creado');
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const pruebaVer = async(req,res)=>{
    try {
        const result = await eventModel.findAll({
            include:[{
                model:adviserModel,
                attributes:['id','fullName']
            },{
                model:studentModel,
                attributes:['id','fullName']
            }]
        })
        
        res.json(result);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const pruebaBuscar = async(req,res)=>{
    const {student} = req.query;
    try {
       /*  const students = await studentModel.findAll({
            where:{
                fullName:{
                    [Op.substring]:student
                }
            }
            ,attributes:['id','fullName'],
            include:{model:eventModel}
        }); */
        const events = await eventModel.findAll({
            include:{
                model:studentModel,
                where:{
                    fullName:{
                        [Op.substring]:student
                    }
                }
            }
        })
        res.json(events)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
//Export methods
module.exports = {
    addStudent,
    getAllAdvisers,
    getAllStudent,
    getStudent,
    login,
    logOut,
    prueba,
    pruebaVer,
    pruebaBuscar
};