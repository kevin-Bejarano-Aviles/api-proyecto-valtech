//Require our db
const db = require('../database/db');
//Require sequelize
const { DataTypes} = require('sequelize');
// Mayuscula inicio o no?
const studentModel = db.define('students', {
    fullName:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING},
    phoneNumber:{type:DataTypes.INTEGER},
    program:{type:DataTypes.STRING},
    avatar:{type:DataTypes.STRING},
    dni:{type:DataTypes.INTEGER},
    school:{type:DataTypes.STRING},
    age:{type:DataTypes.INTEGER},
    address:{type:DataTypes.STRING},
    motive:{type:DataTypes.STRING},
    user:{type:DataTypes.STRING},
    password:{type:DataTypes.STRING},
    eventId:{type:DataTypes.INTEGER},//association with event table
    adviserId:{type:DataTypes.INTEGER}//association with counselor table
})
//Export model
module.exports = studentModel