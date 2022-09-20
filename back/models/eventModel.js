//Require our db
const db = require('../database/db');
//Require sequelize
const { DataTypes} = require('sequelize');
// define our db and the attributes
const eventModel = db.define('events', {
    name:{type:DataTypes.STRING},
    date:{type:DataTypes.DATE},
    time:{type:DataTypes.TIME},
    detail:{type:DataTypes.STRING},
    duration:{type:DataTypes.TIME},
    adviser_event_id:{type:DataTypes.INTEGER}
})
//Export model
module.exports = eventModel