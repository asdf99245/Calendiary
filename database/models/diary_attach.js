'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diary_attach extends Model {
    static associate(models) {
      this.belongsTo(models.Diary, {
        foreignKey: 'diary_id',
        targetKey: 'diary_id',
        onDelete: 'cascade',
      });
    }
  }
  Diary_attach.init(
    {
      file_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_origin_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Diary_attach',
      tableName: 'diary_attaches',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Diary_attach;
};
