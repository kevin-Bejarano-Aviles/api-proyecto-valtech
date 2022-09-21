// Require student model
const studentModel = require("../models/studentModel.js"); //Require student Model
const { check, validationResult, body } = require('express-validator');//Require express validator to add validations
module.exports = [ //Export our validations
    check('fullName').notEmpty().withMessage('Ingrese su nombre y apellido'),
    check('email').isEmail().withMessage('Debe ingresar un email en el campo'),
    body('email') // This validation is to check if the email is already in our db
        .custom(function (value) {
            return studentModel.findOne({
                where: {
                    email: value
                },attributes:['email']
            })
                .then(email => {
                    if (email) { // if email is already in our db will reject 
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
    body('dni') //This validation is to check if the dni is already in our db
        .custom(function (value) {
            return studentModel.findOne({
                where: {
                    dni: value
                },attributes:['dni']
            })
                .then(dni => {
                    if (dni) {
                        // if dni is already in our db will reject 
                        return Promise.reject('Este dni ya existe en nuestra base de datos')
                    }
                })
        }),
    check('school').notEmpty().withMessage('Ingrese su colegio'),
    check('age').notEmpty().withMessage('Ingrese su edad'),/* .isLength({min:18,max:99}).withMessage('La edad tiene que ser minimo de 18 años y maximo de 99 años'), */
    body('age').custom(value=>{
        if(value < 18 || value > 99){
            return false
        }else{
            return true
        }
    }).withMessage('La edad tiene que ser mayor a 18 y menor a 99'),
    check('address').notEmpty().withMessage('Ingrese su dirección'),
    check('motive').notEmpty().withMessage('Ingrese el motivo por el cual se acerca a la institución'),
    check('pass').notEmpty().withMessage('Ingrese una contraseña'),
    body('confirmPass') //if the 'confirmpass' isn't the same entered in 'pass' will not leave the user register 
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
                        // if user is already in our db will reject 
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
            } //If the user don't add an img will reject the form  with the message "tiene que ingresar una imagen"
        }).withMessage('Tiene que ingresar una imagen'),
         body('avatar').custom((value,{req})=>{
            value = req.files[0];
               //Declare what type of img our form will accept and if the user enter a diferent type will reject it
                if(value.mimetype == 'image/png' || value.mimetype == 'image/jpg' || value.mimetype == 'image/jpeg'){
                    return true
                }else{
                    return false
                } 
        }).withMessage("El formato de la imagen debe ser: jpg, jpeg, png o gif") 
]