'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Advisers', [{
      fullName: 'Daisy Paredes',
      email: 'dparedes@arbusta.net',
      avatar: 'adviser01.png',
      phoneNumber: '1127458945',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      fullName: 'Gabriel Muñoz',
        email: 'gabriel.munoz@arbusta.net',
        avatar: 'adviser02.jpg',
        phoneNumber: '1128458945',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      fullName: 'Katherine Carmona Carrasco',
      email: 'katherine.carmona@arbusta.net',
      avatar: 'adviser03.jpg',
      phoneNumber: '1113457890',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      fullName: 'Julieta Speranza',
      email: 'julieta.speranza@arbusta.net',
      avatar: 'adviser04.jpg',
      phoneNumber: '1130458945',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Advisers', null, {});
  }
};
