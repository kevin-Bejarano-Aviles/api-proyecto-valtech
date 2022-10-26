const { Router } = require('express');

const router = Router();
const { isAuthorized } = require('../../middlewares/index');
const { assignAdviser, getAllAdvisers } = require('../../controllers/admin/adviser');
const { fieldValidations } = require('../../middlewares/index');
const validationAdviser = require('../../validations/assingAdviserValidation');

router.get('/', isAuthorized, getAllAdvisers);
router.put('/student/:id', isAuthorized, validationAdviser, fieldValidations, assignAdviser);
module.exports = router;
