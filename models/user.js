'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction);
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          msg: 'Email is empty'
        },
        notNull : {
          msg: 'Email is empty'
        }
      }
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: 'Password is empty'
        },
        notNull : {
          msg: 'Password is empty'
        }

      }
      
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          msg: 'Choose role;'
        },
        notNull : {
          msg: 'Choose role'
        }
      }
      
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, option) {
        // encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password =  hash;
      }
    }
  });
  return User;
};