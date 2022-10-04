'use strict';
const bcryptjs = require('bcryptjs');
let pass = '123456789';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [{
      fullName: 'Lautaro Coria',
      email: 'lautaroCoria@gmail.com',
      phoneNumber: 1123415321,
      program:'Orientación vocacional',
      avatar: 'student1.jpg',
      dni: 40124214,
      school:'Arbusta',
      age: 22,
      address:'Calle falsa 123',
      motive:'Para mejorar',
      user:'40124214',
      password: bcryptjs.hashSync(pass,10),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      fullName: 'Gonzalo Alvarez',
      email: 'gonzaAlvarez@gmail.com',
      phoneNumber: 1142345678,
      program:'Reorientación vocacional',
      avatar: 'student2.jpg',
      dni: 41234357,
      school:'Arbusta',
      age: 21,
      address:'Calle falsa 124',
      motive:'Para mejorar',
      user:'41234357',
      password: bcryptjs.hashSync(pass,10),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      fullName: 'Guadalupe Garcilazo',
      email: 'guadaGarcilazo@gmail.com',
      phoneNumber: 1567895432,
      program:'Taller de matemáticas',
      avatar: 'student3.jpg',
      dni: 43459978,
      school:'Arbusta',
      age: 21,
      address:'Calle falsa 125',
      motive:'Para mejorar',
      user:'43459978',
      password: bcryptjs.hashSync(pass,10),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      fullName: 'Sofia Serrano',
      email: 'sofiSerrano@gmail.com',
      phoneNumber: 1165897485,
      program:'Métodos de estudio',
      avatar: 'student4.jpg',
      dni: 42658978,
      school:'Arbusta',
      age: 22,
      address:'Calle falsa 126',
      motive:'Para mejorar',
      user:'42658978',
      password: bcryptjs.hashSync(pass,10),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      fullName: 'Kevin Aviles',
      email: 'kevinAviles@gmail.com',
      phoneNumber: 1165789421,
      program:'Orientación vocacional',
      avatar: 'student5.jpg',
      dni: 42288785,
      school:'Arbusta',
      age: 22,
      address:'Calle falsa 127',
      motive:'Para mejorar',
      user:'42288785',
      password: bcryptjs.hashSync(pass,10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
};