"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("students", "emailToken", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("students", "isVerified", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("students", "emailToken"),
      queryInterface.removeColumn("students", "isVerified"),
    ]);
  },
};
