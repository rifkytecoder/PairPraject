const { Item, ItemDetail } = require('./models');

Item.findAll({ include: ItemDetail }).then((data) => {
  console.log(data);
});

// ItemDetail.findAll({
//   include: [
//     {
//       model: ItemDetail,
//     },
//   ],
// }).then((data) => console.log(data));
