/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING(500),
      },
      email: {
        type: Sequelize.STRING(500),
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
      },
      program: {
        type: Sequelize.STRING(100),
      },
      avatar: {
        type: Sequelize.STRING(100),
      },
      dni: {
        type: Sequelize.INTEGER,
      },
      school: {
        type: Sequelize.STRING(500),
      },
      age: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING(500),
      },
      motive: {
        type: Sequelize.STRING(500),
      },
      user: {
        type: Sequelize.STRING(45),
      },
      password: {
        type: Sequelize.STRING(500),
      },
      adviserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Advisers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Students');
  },
};
