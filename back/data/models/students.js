const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Students.belongsTo(models.Advisers, {
        foreignKey: 'adviserId',
        targetKey: 'id',
      });
      Students.belongsToMany(models.Events, {
        through: models.Students_events,
      });
      // define association here
    }
  }
  Students.init(
    {
      fullName: DataTypes.STRING(500),
      email: DataTypes.STRING(500),
      phoneNumber: DataTypes.STRING(500),
      program: DataTypes.STRING(100),
      avatar: DataTypes.STRING(100),
      dni: DataTypes.STRING(500),
      school: DataTypes.STRING(500),
      age: DataTypes.INTEGER,
      address: DataTypes.STRING(500),
      motive: DataTypes.STRING(500),
      user: DataTypes.STRING(45),
      password: DataTypes.STRING(500),
      adviserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    },
    {
      sequelize,
      modelName: 'Students',
    },
  );
  return Students;
};
