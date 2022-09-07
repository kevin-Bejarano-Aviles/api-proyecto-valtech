//Requires models
const studentModel = require('./studentModel');
const adviserModel = require('./adviserModel');
const eventModel = require('./eventModel');
//Define relations
studentModel.hasMany(adviserModel,{foreignKey:'adviserId'});
adviserModel.belongsTo(studentModel,{foreignKey:'adviserId'});
adviserModel.hasMany(eventModel,{foreignKey:'adviser_event_id'});
eventModel.belongsTo(adviserModel,{foreignKey:'adviser_event_id'});
eventModel.hasMany(studentModel,{foreignKey:'eventId'});
studentModel.belongsTo(eventModel,{foreignKey:'eventId'});
//export models with their relations
module.exports = {
    adviserModel,
    eventModel,
    studentModel
};