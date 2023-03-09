'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItemDetail.belongsTo(models.Item);
    }
  }
  ItemDetail.init({
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ItemDetail',
  });
  return ItemDetail;
};