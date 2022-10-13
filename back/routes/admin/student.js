const { Router } = require('express');
const router = Router();
const { isAuthorized, fieldValidation, upload } = require('../../middlewares/index');
const { addStudent, getAllStudent, getStudent } = require('../../controllers/admin/student')
const studentChecks = require('../../validations/studentChecks');
router.post('/', isAuthorized, upload.any(), studentChecks, fieldValidation, addStudent);
router.get('/', isAuthorized,getAllStudent);
router.get('/:id', isAuthorized,getStudent);
module.exports = router;