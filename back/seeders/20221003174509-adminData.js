'use strict';
const bcryptjs = require('bcryptjs');
let pass = process.env.ADMIN_PASS || '4R8u$t47';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE admins AUTO_INCREMENT = 1")&&queryInterface.bulkInsert('Admins', [{
      fullName: process.env.ADMIN_FULLNAME ||'Sofia Serrano',
      email: process.env.ADMIN_EMAIL || 'sofiaSerrano@gmail.com',
      avatar: 'default.jpg',
      password: bcryptjs.hashSync(pass,10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TABLE admins AUTO_INCREMENT = 1")&&queryInterface.bulkDelete('Admins', null, {});
  }
};
