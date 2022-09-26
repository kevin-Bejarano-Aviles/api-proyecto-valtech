//Require our db
const db = require('../database/db');
//Require sequelize

const { DataTypes} = require('sequelize');
// // define our db and the attributes
const studentsEventsModel = db.define('students_events', {
    studentId:{type:DataTypes.INTEGER},
    eventId:{type:DataTypes.INTEGER},
})
//Export model
module.exports = studentsEventsModel;