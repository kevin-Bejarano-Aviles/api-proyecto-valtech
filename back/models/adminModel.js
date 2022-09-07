//Require our db
const db = require('../database/db');
//Require sequelize
const { DataTypes} = require('sequelize');
// Mayuscula inicio o no?
const adminModel = db.define('admins', {
    fullName:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING},
    avatar:{type:DataTypes.STRING},
    password:{type:DataTypes.STRING}
})
//Export model
module.exports = adminModel
