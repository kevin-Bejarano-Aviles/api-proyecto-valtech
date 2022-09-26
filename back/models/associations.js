//Requires models
const studentModel = require('./studentModel');
const adviserModel = require('./adviserModel');
const eventModel = require('./eventModel');
const studentsEventsModel = require('./studentEvent');
//Define relations
studentModel.belongsTo(adviserModel,{foreignKey:'adviserId'});
adviserModel.hasMany(studentModel,{foreignKey:'adviserId'});
adviserModel.hasMany(eventModel,{foreignKey:'adviser_event_id'});
eventModel.belongsTo(adviserModel,{foreignKey:'adviser_event_id'});
studentModel.belongsToMany(eventModel,{through:studentsEventsModel});
eventModel.belongsToMany(studentModel,{through:studentsEventsModel});
/* eventModel.hasMany(studentModel,{foreignKey:'eventId'});
studentModel.belongsTo(eventModel,{foreignKey:'eventId'}); */
//export models with their relations
module.exports = {
    adviserModel,
    eventModel,
    studentModel,
    studentsEventsModel
};