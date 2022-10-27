const { check } = require('express-validator');
const { existingAdviser } = require('../helpers/db-validators');

module.exports = [
  check('idAdviser').notEmpty().withMessage('Tiene que asignar un orientador al estudiante'),
  check('idAdviser').custom(existingAdviser).withMessage('El Orientador no existe en nuestra base de datos'),
];
