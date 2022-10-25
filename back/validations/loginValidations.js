const { check } = require('express-validator');

module.exports = [
  check('email').notEmpty().withMessage('El campo email no tiene que estar vacio'),
  check('pass').notEmpty().withMessage('El campo password no tiene que estar vacio'),
];
