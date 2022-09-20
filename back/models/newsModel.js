//Require our db
const db = require('../database/db');
//Require sequelize
const { DataTypes} = require('sequelize');
// // define our db and the attributes
const newsModel = db.define('news', {
    title:{type:DataTypes.STRING},
    content:{type:DataTypes.STRING},
    image:{type:DataTypes.STRING}
})
//Export model
module.exports = newsModel;