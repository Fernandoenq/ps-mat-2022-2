'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Turma, {
        foreignKey: 'turma_id',
        targetKey: 'id',
        as: 'turma'
      })
    }
  }
  Aluno.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    doc_identidade: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    cpf: {
        type: DataTypes.CHAR(14),
        allowNull: false
    },
    logradouro: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    num_imovel: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    bairro: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    municipio: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    uf: {
        type: DataTypes.CHAR(2),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Aluno',
    tableName: 'alunos'
  });
  return Aluno;
};