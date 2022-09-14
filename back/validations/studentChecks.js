const studentModel = require("../models/studentModel.js"); //Require student Model
const { check, validationResult, body } = require('express-validator');//Require express validator to add validations
module.exports = [ //Export our validations
    check('fullName').notEmpty().withMessage('Ingrese su nombre y apellido'),
    check('email').isEmail().withMessage('Debe ingresar un email en el campo'),
    body('email')
        .custom(function (value) {
            return studentModel.findOne({
                where: {
                    email: value
                }
            })
                .then(email => {
                    if (email) {
                        return Promise.reject('Este email ya tiene una cuenta en nuetra base de datos')
                    }
                })
        }),
    check('phoneNumber').notEmpty().withMessage('Ingrese su número de celular')
        .isLength({ max: 50 }).withMessage('Máximo 50 números'),
    check('program').notEmpty().withMessage('Ingrese a qué programa ingresará'),
    check('dni').notEmpty().withMessage('Ingrese su número de DNI')
        .isLength({ max: 50 }).withMessage('Máximo 50 números'),
    body('dni')
        .custom(function (value) {
            return studentModel.findOne({
                where: {
                    dni: value
                }
            })
                .then(dni => {
                    if (dni) {
                        return Promise.reject('Este usuario ya existe en nuestra base de datos')
                    }
                })
        }),
    check('school').notEmpty().withMessage('Ingrese su colegio'),
    check('age').notEmpty().withMessage('Ingrese su edad'),
    check('address').notEmpty().withMessage('Ingrese su dirección'),
    check('motive').notEmpty().withMessage('Ingrese el motivo por el cual se acerca a la institución'),
    check('pass').notEmpty().withMessage('Ingrese una contraseña'),
    check('user').notEmpty().withMessage('Ingrese un nombre de usuario'),
    body('user')
        .custom(function (value) {
            return studentModel.findOne({
                where: {
                    user: value
                }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject('Este usuario ya existe en nuestra base de datos')
                    }
                })
        }),
        body('avatar').custom((value,{req})=>{
            value = req.files[0]
            if(value){
                if(value.mimetype == 'image/png' || value.mimetype == 'image/jpg' || value.mimetype == 'image/jpeg'){
                    return true
                }else{
                    return false
                }
            }else{
                return true
            }
            
        })
        .withMessage("El formato de la imagen debe ser: jpg, jpeg, png o gif")
]