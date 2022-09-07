//Require our db
const db = require('../database/db');
//Require sequelize
const { DataTypes} = require('sequelize');
// Mayuscula inicio o no?
const newsModel = db.define('news', {
    title:{type:DataTypes.STRING},
    content:{type:DataTypes.STRING},
    image:{type:DataTypes.STRING}
})
//Export model
module.exports = newsModel;