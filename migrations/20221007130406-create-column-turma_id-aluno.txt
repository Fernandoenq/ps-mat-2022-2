'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      'alunos', //nome da tabela
      'turma_id', //nome do novo campo
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'cursos', //nome da tabela referenciada
          key: 'id' //nome da chave primária da tabela referenciada
        },
        onUpdate: 'CASCADE', //se atualizar a chave primaria os que tem como estrangeira atualiza lá tambem
        onDelete: 'SET NULL' // se apagar a primaria todos que a tem como estrangeira vira NULL
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      'alunos', //nome da tabela
      'turma_id' //nome do novo campo
    )
  }
};
