'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Curso, {
        foreignKey: 'curso_id',
        targetKey: 'id',
        as: 'curso'
      })
  
      this.belongsTo(models.Professor, {
        foreignKey: 'professor_id',
        targetKey: 'id',
        as: 'professor'
      })

      this.hasMany(models.Aluno, {
        foreignKey: 'turma_id',
        targetKey: 'id',
        as: 'alunos'
      })

    }
  }
  Turma.init({
    // Model attributes are defined here
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    dia_semana: {
      type: DataTypes.TINYINT,
      allowNull: false,
      min: 1,  // domingo
      max: 7   // sábado
    },
    horario_ini: {
      type: DataTypes.TIME,
      allowNull: false
    },
    horario_fim: {
      type: DataTypes.TIME,
      allowNull: false
    },
    data_ini: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    data_fim: {
      type: DataTypes.DATEONLY
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
    sequelize,
    modelName: 'Turma',
    tableName: 'turmas'
  });
  return Turma;
};