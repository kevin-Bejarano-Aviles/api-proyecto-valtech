//Require express
const express = require('express');
const router = express.Router();
//Require our methods from admin controllers
const  {addStudent, getAllStudent, login, logOut, getStudent, getAllAdvisers,assignAdviser, createEvent, getAllEvents, deleteEvent} = require('../controllers/adminController.js');
//Require our middlewares
const adminCheck = require('../middlewares/adminCheck'); // require admin checks
const studentCheck = require('../validations/studentChecks'); // require student checks
const uploadStudent = require('../middlewares/upAvatar.js'); // require our middleware for avatars
const eventCheck = require('../validations/eventCheck');
const {validationFields} = require('../middlewares/validationCheck');
//Http with their methods and urls
router.post('/addStudent',adminCheck,uploadStudent.any(),studentCheck,validationFields,addStudent);
router.get('/students',adminCheck, getAllStudent);
router.get('/students/:id',adminCheck,getStudent);
router.post('/adminLogin',login);
router.get('/logOut',adminCheck, logOut);
router.get('/advisers',adminCheck,getAllAdvisers);
router.post('/addEvent',eventCheck,validationFields,createEvent);
router.put('/assignAdviser/:id',assignAdviser);
router.get('/events',getAllEvents);
router.delete('/deleteEvent/:id',deleteEvent);

//Export router
module.exports = router;