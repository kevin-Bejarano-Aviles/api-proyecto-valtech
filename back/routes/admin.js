const express = require('express');
const router = express.Router();
const  {addStudent, getAllStudent, login, logOut} = require('../controllers/adminController.js');
const createAdmin = require('../middlewares/createAdmin'); // create admin user on database
const adminCheck = require('../middlewares/adminCheck');
const uploadStudent = require('../middlewares/upOrientado.js');
router.post('/addStudent',uploadStudent.any(), addStudent);
router.get('/students', getAllStudent);
router.post('/adminLogin',createAdmin, login);
router.get('/logOut',adminCheck, logOut); 

module.exports = router;