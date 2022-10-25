const { Router } = require('express');

const router = Router();
const { login } = require('../../controllers/admin/auth');
const loginValidations = require('../../validations/loginValidations');
const { fieldValidations } = require('../../middlewares/index');

router.post('/login', loginValidations, fieldValidations, login);
module.exports = router;
