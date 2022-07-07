'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Diary, {
        foreignKey: 'diary_writer',
        sourceKey: 'user_id',
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return User;
};
