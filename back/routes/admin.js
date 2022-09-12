const express = require('express');
const router = express.Router();
const  {addStudent, getAllStudent, login, logOut} = require('../controllers/adminController.js');
const createAdmin = require('../middlewares/createAdmin'); // create admin user on database

router.post('/addStudent', addStudent);
router.get('/students', getAllStudent);
router.post('/adminLogin',createAdmin, login);
router.get('/logOut', logOut); 

module.exports = router;