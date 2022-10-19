const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /* eslint camelcase: "off" */
  class Students_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Students_events.init({
    studentId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Students_events',
  });
  return Students_events;
};
