const { Router } = require('express');

const router = Router();
const { isAuthorized, fieldValidations, upload } = require('../../middlewares/index');
const {
  addStudent, getAllStudent, getStudent, assignAdviser,
} = require('../../controllers/admin/student');
const studentValidations = require('../../validations/studentValidations');
const validationAdviser = require('../../validations/assingAdviserValidation');

router.post('/', isAuthorized, upload.any(), studentValidations, fieldValidations, addStudent);
router.get('/', isAuthorized, getAllStudent);
router.get('/:id', isAuthorized, getStudent);
router.put('/:id/adviser', isAuthorized, validationAdviser, fieldValidations, assignAdviser);
module.exports = router;
