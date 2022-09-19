//Require models and associations of the db
const { adviserModel, eventModel, studentModel } = require('../models/associations')
const AdminModel = require('../models/adminModel');
const NewsModel = require('../models/newsModel');
const db = require('../database/db');
const fs = require('fs');
const path = require('path');
//Require bcryptjs
const bcryptjs = require('bcryptjs');
//Require express validator 
const { validationResult } = require('express-validator');

const login = async (req, res) => {
    const { email, pass } = req.body;
    //const passHash = bcryptjs.hashSync(pass,12);
    try {
        const admin = await AdminModel.findOne({
            where: {
                email: email
            }

        });
        if (!admin) {
            return res.status(401).json({ message: 'Credenciales invalidas' });
        }
        if (!bcryptjs.compareSync(pass, admin.password)) {
            return res.status(401).json({ message: 'Credenciales invalidas' });
        }
        req.session.adminLog = {
            id: admin.id,
            fullName: admin.fullName,
            avatar: admin.avatar
        }
        let theAdmin = req.session.adminLog;
        res.json(theAdmin);

    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const addStudent = async (req, res) => {
    const { fullName, email, phoneNumber, program, dni, school, age, address, motive, user, pass } = req.body;
    let errors = validationResult(req);
    //console.log(errors);
    if (errors.isEmpty()) {
        try {
            const avatar = req.files[0].filename;
            const passHash = bcryptjs.hashSync(pass, 12);
            await db.query("ALTER TABLE students AUTO_INCREMENT = 1");
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
        res.status(200).json(errors.mapped());
        //console.log(req.files[0]);
        if(typeof req.files[0] != 'undefined'){
            const avatar = req.files[0].filename;
            fs.unlinkSync(path.join(__dirname,'..','..','front','src','img','students',`${avatar}`));
        }
    }
};

const getAllStudent = async (req, res) => {
    try {
        const students = await studentModel.findAll({attributes:{exclude : ['password']}}); // excludes just one item
        res.json(students);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

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

const logOut = (req = request, res) => {

    req.session.destroy((err) => {
        res.clearCookie('userId').send('cleared cookie');//por alguna razon al agregar el send si funciona
    });

};

module.exports = {
    addStudent,
    getAllStudent,
    getStudent,
    login,
    logOut
};