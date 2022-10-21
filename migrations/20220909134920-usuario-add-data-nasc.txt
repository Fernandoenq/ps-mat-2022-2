'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'usuarios', //Table name
      'data_nasc', //Camp name
      {
        type: Sequelize.DATE,
        allowNull:false //so funciona assim pq nao tem usuários criado
        //então não da problema, ja que o campo nao pode ser nulo
      }
    )
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'usuarios', //Table name
      'data_nasc' //Camp name
    )
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
