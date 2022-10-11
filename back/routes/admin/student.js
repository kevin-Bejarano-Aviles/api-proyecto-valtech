const { Router } = require('express');
const router = Router();
const { adminCheck, fieldValidation, upload } = require('../../middlewares/index');
const { addStudent, getAllStudent, getStudent } = require('../../controllers/admin/student')
const studentChecks = require('../../validations/studentChecks');
router.post('/', adminCheck, upload.any(), studentChecks, fieldValidation, addStudent);
router.get('/', adminCheck,getAllStudent);
router.get('/:id', adminCheck,getStudent);
module.exports = router;