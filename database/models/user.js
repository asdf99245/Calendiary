'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Diary, {
        foreignKey: 'user_id',
        sourceKey: 'user_id',
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
