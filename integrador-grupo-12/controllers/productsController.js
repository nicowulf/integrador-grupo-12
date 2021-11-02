const db = require("../database/models");
const sequelize = db.sequelize;

const productsController = {
  all: (req, res) => {
    db.Product.findAll()
      .then((products) => {
        res.render("products/products", {
          title: "Todos los productos",
          products,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  national: (req, res) => {
    db.Product.findAll();
  },

  international: (req, res) => {
    db.Product.findAll();
  },

  detail: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then((data) => {
        res.render("products/detail", {
          title: "Detalle de producto",
          product: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  cart: (req, res) => {
    res.render("products/productCart", { title: "Carrito de compras" });
  },
};

module.exports = productsController;
