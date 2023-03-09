'use strict';
const { Model } = require('sequelize');
const rupiah = require('../helpers/formatter');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasOne(models.ItemDetail);

      Item.belongsToMany(models.Transaction, { through: 'TransactionItems' });
    }

    get formatRupiah() {
      return rupiah(this.price);
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );
  return Item;
};
