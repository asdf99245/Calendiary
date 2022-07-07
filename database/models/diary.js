'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'diary_writer',
        targetKey: 'user_id',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
      this.hasMany(models.Diary_attach, {
        foreignKey: 'diary_id',
        sourceKey: 'diary_id',
      });
    }
  }
  Diary.init(
    {
      diary_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      diary_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      diary_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diary_text: DataTypes.TEXT('long'),
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Diary',
      tableName: 'diaries',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Diary;
};
