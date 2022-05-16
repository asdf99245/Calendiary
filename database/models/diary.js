'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
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
      diary_id: { type: DataTypes.INTEGER, primaryKey: true },
      diary_date: DataTypes.DATE,
      diary_title: DataTypes.STRING,
      diary_text: DataTypes.STRING(10000),
    },
    {
      sequelize,
      modelName: 'Diary',
    }
  );
  return Diary;
};
