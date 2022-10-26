const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Advisers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Advisers.hasMany(models.Students, {
        foreignKey: 'adviserId',
      });
      Advisers.hasMany(models.Events, {
        foreignKey: 'adviser_event_id',
        // keyType:'id'
      });
      // define association here
    }
  }
  Advisers.init(
    {
      fullName: DataTypes.STRING(500),
      email: DataTypes.STRING(500),
      avatar: DataTypes.STRING(100),
      phoneNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Advisers',
    },
  );
  return Advisers;
};
