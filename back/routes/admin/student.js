const { Router } = require('express');

const router = Router();
const { isAuthorized, fieldValidations, upload } = require('../../middlewares/index');
const { addStudent, getAllStudent, getStudent } = require('../../controllers/admin/student');
const studentValidations = require('../../validations/studentValidations');

router.post('/', isAuthorized, upload.any(), studentValidations, fieldValidations, addStudent);
router.get('/', isAuthorized, getAllStudent);
router.get('/:id', isAuthorized, getStudent);
module.exports = router;
