const express = require('express');
const router = express.Router();
const  {addStudent, getAllStudent, login} = require('../controllers/adminController.js');

router.post('/addStudent', addStudent);
router.get('/students', getAllStudent);
router.post('/adminLogin', login);

module.exports = router;