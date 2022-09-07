//Require our db
const db = require('../database/db');
//Require sequelize
const { DataTypes} = require('sequelize');
// Mayuscula inicio o no?
const adviserModel = db.define('advisers', {
    fullName:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING},
    avatar:{type:DataTypes.STRING},
    phoneNumber:{type:DataTypes.INTEGER}
})
//Export model
module.exports = adviserModel