const { DataTypes } = require('sequelize');
const db = require('../config/db');

const model = db.define('cursos', {
// Model attributes are defined here
id: {
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: DataTypes.INTEGER
},
sigla: {
  allowNull: false,
  type: DataTypes.STRING(5),
  unique:true
},
descricao: {
  type: DataTypes.STRING(50),
  allowNull: false
},
duracao_meses: {
  type: DataTypes.TINYINT(6),
  allowNull: false,
  
},
carga_horaria: {
  type: DataTypes.TINYINT(80),
  allowNull: false,
},
valor_total: {
  type: DataTypes.DECIMAL(18,2),
  allowNull: false,
},
createdAt: {
  allowNull: false,
  type: DataTypes.DATE
},
updatedAt: {
  allowNull: false,
  type: DataTypes.DATE
}

}, {
    tableName: 'cursos'
});
// Chaves estrangeiras
model.associate = models => {
  
  model.belongsTo(models.Turma, {
    foreignKey: 'curso_id',
    targetKey: 'id'
  })
}


// Cria a tabela no banco de dados, caso ainda não exista
model.sync()

module.exports = model


/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /*
    static associate(models) {
      // define association here
    }
  }
  Curso.init({
    id: DataTypes.INTEGER,
    sigla: DataTypes.STRING,
    descricao: DataTypes.STRING,
    duracao_meses: DataTypes.INTEGER,
    carga_horaria: DataTypes.INTEGER,
    valor_total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};*/