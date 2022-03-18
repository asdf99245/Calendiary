'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Diary, {
        as: 'diaries',
        foreignKey: 'user_id',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      });
    }
  }
  User.init(
    {
      user_id: DataTypes.STRING(50),
      user_password: DataTypes.STRING(50),
      user_name: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
