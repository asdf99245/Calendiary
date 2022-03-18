'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'users',
        foreignKey: 'user_id',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
    }
  }
  Diary.init(
    {
      date: DataTypes.DATE,
      text: DataTypes.STRING(10000),
      imgurl: DataTypes.STRING(200),
    },
    {
      sequelize,
      modelName: 'Diary',
    }
  );
  return Diary;
};
