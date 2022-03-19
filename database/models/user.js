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
      user_id: { primaryKey: true, type: DataTypes.STRING(50) },
      user_password: DataTypes.STRING,
      user_name: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
