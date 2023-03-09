const {
  User,
  Item,
  Transaction,
  TransactionItem,
  ItemDetail,
} = require('../models');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const session = require('express-session');
const rupiah = require('../helpers/formatter');

class Controller {
  // show form register
  static register(req, res) {
    res.render('register-form');
  }

  // show
  static postRegister(req, res) {
    const { email, password, role } = req.body;

    User.create({ email, password, role })
      .then((result) => {
        // res.send(`success menambahkan ${email}`)
        res.redirect('/tokopaedi');
      })
      .catch((err) => res.send(err.errors[0].message));
  }

  // login
  static login(req, res) {
    const { error } = req.query;

    res.render('login-form', { error });
  }

  // POST login page
  static postLogin(req, res) {
    const { email, password } = req.body;

    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user) {
          const isValid = bcrypt.compareSync(password, user.password);
          if (isValid) {
            //set session
            req.session.email = user.email;
            return res.redirect('/tokopaedi');
          } else {
            const error = 'Password invalid';
            return res.redirect(`/login?error=${error}`);
          }
        }
      })
      .catch((err) => res.send(err));
  }

  // home
  static tokopaedi(req, res) {
    const { search } = req.query;

    const email = req.session.email;
    const options = {};

    if (search) {
      options.where = { name: { [Op.iLike]: `%${search}%` } };
    }

    Item.findAll(options)
      .then((items) => {
        res.render('homepage', { items, email });
      })
      .catch((err) => res.send(err));
  }

  // change profile
  static changeProfile(req, res) {
    User.findOne({ where: { email: req.session.email } })
      // console.log(req.session.email);
      .then((user) => {
        res.render('profile', { user });
      })
      .catch((err) => res.send(err));
  }

  // logout
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/login');
      }
    });
  }

  // item detail view
  static viewItem(req, res) {
    const { id } = req.params;
    Item.findByPk(id, {
      include: ItemDetail,
    })
      .then((item) => {
        // res.send(item);
        res.render('detail-item', { item, rupiah });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  // static editItem(req, res) {
  //   const { id } = req.params;
  //   Item.findByPk(id, {
  //     include: ItemDetail,
  //   })
  //     .then((item) => {
  //       res.render('edit-item', { item });
  //     })
  //     .catch((err) => {
  //       res.send(err);
  //     });
  // }

  static buyItem(req, res) {
    const { id } = req.params;
    Item.decrement('stock', { where: { id } })
      .then((stock) => {
        res.redirect('/tokopaedi');
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static deleteProfile(req, res) {
    const { id } = req.params;
    User.destroy({ where: { id } })
      .then((user) => {
        return req.session.destroy();
      })
      .then((result) => {
        res.redirect('/tokopaedi');
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static updateItem(req, res) {
    res.send('OK');
  }
}

module.exports = Controller;
