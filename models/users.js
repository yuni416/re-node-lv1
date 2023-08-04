'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Posts, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Comments, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Likes, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
      this.hasMany(models.Posts, {
        sourceKey: 'nickname',
        foreignKey: 'nickname',
      });
      this.hasMany(models.Comments, {
        sourceKey: 'nickname',
        foreignKey: 'nickname',
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
