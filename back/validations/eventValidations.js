// Require student model
//const eventModel = require('../models').Events; //Require student Model
const {existingAdviser,studentsInDb} = require('../helpers/db-validators')
const { check, body } = require('express-validator');//Require express validator to add validations

module.exports = [
    check('studentsId').notEmpty().withMessage('Tiene que ingresar un array de id de estudiantes'),
    body('studentsId').custom(studentsInDb),
    check('name')
        .notEmpty().withMessage('El evento debe contener un nombre'),
    check('date')
        .notEmpty().withMessage('El evento debe contener una fecha'),
    check('date')
        .isDate().withMessage('El evento debe contener la fecha en su formato'),
    check('time')
        .notEmpty().withMessage('El evento debe contener un horario'),
    check('detail')
        .notEmpty().withMessage('El evento debe contener un detalle'),
    check('duration')
        .notEmpty().withMessage('El evento debe contener un horario'),
    check('adviser_event_id')
        .notEmpty().withMessage('El evento debe tener un orientador')
        .isInt().withMessage('Tiene que pasar el numero de id del orientador'),
    body('adviser_event_id')
        .custom(existingAdviser)
]