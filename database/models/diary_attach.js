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
      },
      file_name: DataTypes.STRING,
      file_origin_name: DataTypes.STRING,
      file_path: DataTypes.STRING,
      file_size: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Diary_attach',
    }
  );
  return Diary_attach;
};
