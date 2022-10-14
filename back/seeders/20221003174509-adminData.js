'use strict';
const bcryptjs = require('bcryptjs');
let pass = '4R8u$t47';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Admins', [{
      fullName: 'Sofia Serrano',
      email: 'sofiaSerrano@gmail.com',
      avatar: 'default.jpg',
      password: bcryptjs.hashSync(pass,10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
