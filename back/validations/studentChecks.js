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
                },attributes:['email']
            })
                .then(email => {
                    if (email) {
                        return Promise.reject('Este email ya tiene una cuenta en nuestra base de datos')
                    }
                })
        }),
    check('phoneNumber').notEmpty().withMessage('Ingrese su número de celular')
        .isLength({ max: 50 }).withMessage('Máximo 50 números'),
    check('program').notEmpty().withMessage('Ingrese a qué programa ingresará'),
    check('dni').notEmpty().withMessage('Ingrese su número de DNI')
        .isInt().withMessage('El dni solo tiene que tener números sin puntos')
        .isLength({min: 7, max: 9 }).withMessage('El dni debe tener un minimo de 7 caracteres y un maximo de 9 caracteres'), 
    body('dni')
        .custom(function (value) {
            return studentModel.findOne({
                where: {
                    dni: value
                },attributes:['dni']
            })
                .then(dni => {
                    if (dni) {
                        return Promise.reject('Este dni ya existe en nuestra base de datos')
                    }
                })
        }),
    check('school').notEmpty().withMessage('Ingrese su colegio'),
    check('age').notEmpty().withMessage('Ingrese su edad'),
    check('address').notEmpty().withMessage('Ingrese su dirección'),
    check('motive').notEmpty().withMessage('Ingrese el motivo por el cual se acerca a la institución'),
    check('pass').notEmpty().withMessage('Ingrese una contraseña'),
    body('confirmPass')
    .custom((value,{req}) => {
        if(value != req.body.pass){
            return false
        }
        return true
    })
    .withMessage("Las constraseñas no coiciden"),
    check('user').notEmpty().withMessage('Ingrese un nombre de usuario')
    .isInt().withMessage('El nombre de usuario solo tiene que tener números sin puntos'),
    body('user')
        .custom(function (value) {
            return studentModel.findOne({
                where: {
                    user: value
                },attributes:['user']
            })
                .then(user => {
                    if (user) {
                        return Promise.reject('Este usuario ya existe en nuestra base de datos')
                    }
                })
        }),
        body('avatar').custom((value,{req})=>{
            value = req.files[0];
            if(!value){
                return false;
            }else{
                return true
            }
        }).withMessage('Tiene que ingresar una imagen'),
         body('avatar').custom((value,{req})=>{
            value = req.files[0];
                if(value.mimetype == 'image/png' || value.mimetype == 'image/jpg' || value.mimetype == 'image/jpeg'){
                    return true
                }else{
                    return false
                } 
        }).withMessage("El formato de la imagen debe ser: jpg, jpeg, png o gif") 
]