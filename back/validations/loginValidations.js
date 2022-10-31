const { check } = require('express-validator');

module.exports = [
  check('email')
    .notEmpty()
    .withMessage('Tiene que ingresar un email')
    .isEmail()
    .withMessage('El campo tiene que ser un email valido'),
  check('pass').notEmpty().withMessage('Tiene que ingresar su contraseña'),
];
