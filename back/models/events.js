'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Events.belongsToMany(models.Students,{
        through:models.Students_events
      });
      Events.belongsTo(models.Advisers,{
        targetKey:'id',
        foreignKey:'adviser_event_id',
        //targetKey:'adviser_event_id'
      })
      // define association here
    }
  }
  Events.init({
    name: DataTypes.STRING(200),
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    detail: DataTypes.STRING(500),
    duration: DataTypes.INTEGER,
    adviser_event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};