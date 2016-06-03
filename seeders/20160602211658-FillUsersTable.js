'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      { username: 'admin',
        password: encryptPassword('1234', 'aaaa'),
        salt:     'aaaa',
        createdAt: new Date(),
        updatedAt: new Date() },
      { username: 'david',
        password: encryptPassword('5678', 'bbbb'),
        salt: 'bbbb',
        createdAt: new Date(),
        updatedAt: new Date() }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};