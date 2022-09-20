//Require express
const express = require('express');
const router = express.Router();
//Require our methods from admin controllers
const  {addStudent, getAllStudent, login, logOut, getStudent} = require('../controllers/adminController.js');
//Require our middlewares
const createAdmin = require('../middlewares/createAdmin'); // create admin user on database
const adminCheck = require('../middlewares/adminCheck'); // require admin checks
const studentCheck = require('../validations/studentChecks'); // require student checks
const uploadStudent = require('../middlewares/upAvatar.js'); // require our middleware for avatars

//Http with their methods and urls
router.post('/addStudent',adminCheck,uploadStudent.any(),studentCheck,addStudent);
router.get('/students',adminCheck, getAllStudent);
router.get('/students/:id',adminCheck,getStudent);
router.post('/adminLogin',createAdmin,login);
router.get('/logOut',adminCheck, logOut); 
 
//Export router
module.exports = router;