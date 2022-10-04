//Require models and associations of the db
const AdminModel = require('../models').Admins;
const AdviserModel = require('../models').Advisers;
const StudentModel = require('../models').Students;//solo asi lo reconoce
const EventModel = require('../models').Events;
const db = require('../models/index');
const {Op} = require('sequelize');
//Require bcryptjs
const bcryptjs = require('bcryptjs');
//Require express validator 

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
        res.json({adminLog:req.session.adminLog});

    } catch (error) {
        console.log({error:error.message});
        res.status(500).json({error:error.message});
    }
};

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
            res.json({ message: 'Registro creado correctamente' });
        } catch (error) {
            res.status(500).json({error:error.message});
        }
};

//Method to get all students
const getAllStudent = async (req, res) => {
    try {
        const students = await StudentModel.findAll({attributes:{exclude : ['password']}}); // excludes just one item
        res.json({students});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

//Method to get one student
const getStudent = async (req, res) => {
    try {
        const student = await StudentModel.findAll({
            where: { id: req.params.id },
            attributes:{exclude:['password']},
            include:{
                model:AdviserModel
            }
        });
        if(!student[0]){
            return res.status(404).json({message:'404 user not found'});
        }
        res.json({student:student[0]});
    } catch (error) {
        res.status(500).json({error:error.message});
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
        const advisers = await AdviserModel.findAll();
        res.json({advisers});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
const assignAdviser = async (req,res) => {
    try {
        const {idAdviser} = req.body;
        const {id} = req.params;
        await StudentModel.update({
        adviserId : idAdviser
       },{
        where :{
            id : id
        }
       });
       res.status(200).json({message:`adviser asignado al estudiante con id ${id}`});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const createEvent = async (req,res) => {
    try {
        const {students,name,date,time,detail,duration,adviser_event_id} = req.body;
        await db.sequelize.query("ALTER TABLE events AUTO_INCREMENT = 1");
        const event = await EventModel.create({
            name : name,
            date : date,
            time : time,
            detail:detail,
            duration : duration,
            adviser_event_id : adviser_event_id
        });
        students.forEach(async(item)=>{
            const student = await StudentModel.findOne({
               where : {
                id : item.id
               } 
            });
            await event.addStudent(student); 
        });
    res.json({message:'Event created'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
const getAllEvents = async(req,res)=>{
    try {
        const events = await EventModel.findAll({
            include:[{
                model:AdviserModel,
                attributes:['id','fullName']
            },{
                model:StudentModel,
                attributes:['id','fullName']
            }]
        });
        res.json({events,cant:events.length});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
const eventByStudent = async(req,res)=>{
    const {student} = req.query;
    try {
        const events = await EventModel.findAll({
            include:{
                model:StudentModel,
                where:{
                    fullName:{
                        [Op.substring]:student
                    }
                },
                attributes:['id','fullName']
            }
        });
        if(events.length<1){
            return res.status(404).json({message:'No se encontraron resultados'})
        }
        res.json(events);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
const deleteEvent = async(req,res)=>{
    const {id} = req.params;
    try {
        const event = await EventModel.destroy({
            where:{
                id:id
            }
        });
        //tal vez se va
        if(!event){
            return res.status(404).json({message:'No se puede eliminar el evento porque no existe en la base de datos'})
        }
        res.json({message:'Evento eliminado'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
const pruebaPag = async(req,res)=>{
    const {from=0,limit=4,student=''} = req.query;
    try {
        const allStudent = await StudentModel.findAll({
            where:{
                fullName:{
                    [Op.substring]:student
                }
            },
            offset:Number(from),
            limit:Number(limit)
        });
        if(allStudent.length<1){
            return res.status(404).json({message:'No se encontraron resultados'})
        }
        res.json({allStudent,cant:allStudent.length});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//Export methods
module.exports = {
    addStudent,
    assignAdviser,
    createEvent,
    deleteEvent,
    getAllAdvisers,
    getAllEvents,
    getAllStudent,
    getStudent,
    login,
    logOut
};