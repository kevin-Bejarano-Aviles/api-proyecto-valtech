//const {Students:StudentModel,Advisers:AdviserModel} = require('../../models'); 
const StudentModel = require('../../models').Students;
const AdviserModel = require('../../models').Advisers;
const db = require('../../models/index');
const bcryptjs = require('bcryptjs');
//Method to add a student
const addStudent = async (req, res) => {
    const { fullName, email, phoneNumber, program, dni, school, age, address, motive, user, pass } = req.body;
        try {
            const avatar = req.files[0].filename;
            const passHash = bcryptjs.hashSync(pass, 12); // We use method "hashSync" to hash the password entered
            await db.sequelize.query("ALTER TABLE students AUTO_INCREMENT = 1"); // This line is to reset id so our deletes ids can use the deleted ones
            await StudentModel.create({
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
            res.status(200).json({
                status:'200 OK',
                message:'Student created successfully',
                data:'',
            });
        } catch (error) {
            res.status(500).json({
                status: '500 Internar server error',
                message: 'Error MySQL/Express/Node'
            });
            console.log({error:error.message});
        }
};
//Method to get all students
const getAllStudent = async (req, res) => {
    try {
        const students = await StudentModel.findAll();
        res.status(200).json({
            status:'200 OK',
            message:'',
            data:{students}
        });
    } catch (error) {
        res.status(500).json({
            status: '500 Internar server error',
            message: 'Error MySQL/Express/Node'
        });
        console.log({error:error.message});
    }
};
//Method to get one student
const getStudent = async (req, res) => {
    try {
        const student = await StudentModel.findAll({
            where: { id: req.params.id },
            include:{
                model:AdviserModel
            }
        });
        if(!student[0]){
            return res.status(404).json({
                status:'404 Not found',
                message:'user not found',
                data:''
            });
        };
        res.status(200).json({
            status:'200 OK',
            message:'',
            data:{student:student[0]}
        });
    } catch (error) {
        res.status(500).json({
            status: '500 Internar server error',
            message: 'Error MySQL/Express/Node'
        });
        console.log({error:error.message});
    }
};
module.exports = {
    addStudent,
    getAllStudent,
    getStudent
}