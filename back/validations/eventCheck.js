// Require student model
const eventModel = require('../models/events'); //Require student Model
const { check, validationResult, body } = require('express-validator');//Require express validator to add validations

module.exports = [
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
        .notEmpty().withMessage('El evento debe contener un horario')
        .isInt().withMessage('la duración deben ser en un formato númerico'),
    check('adviser_event_id')
    .notEmpty().withMessage('El evento debe tener un orientador')
]