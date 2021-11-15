const db = require("../database/models");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const path = require('path');

const productsController = {
  all: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "origin" },
        { association: "style" },
        { association: "discount" },
      ],
    })
      .then((products) => {
        //res.send(products);
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
    db.Product.findAll({
      include: [
        { association: "origin" },
        { association: "style" },
        { association: "discount" },
      ],
      where: {
        origin_id: 1,
      },
    })
      .then((products) => {
        res.render("products/national", {
          title: "Productos NACIONALES",
          products,
        });
      })
      .catch((e) => res.send(e));
  },

  international: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "origin" },
        { association: "style" },
        { association: "discount" },
      ],
      where: {
        origin_id: { [Op.gte]: 2 },
      },
    })
      .then((products) => {
        res.render("products/international", {
          title: "Productos INTERNACIONALES",
          products,
        });
      })
      .catch((e) => res.send(e));
  },

  styles: (req, res) => {
    db.Product.findAll({
      include: [{ association: "style" }],
    })
      .then((products) => {
        // res.send(products);
        let styles = products.map((product) => {
          return product.style.style;
        });

        let filterStyles = styles.filter((style, position, styles) => {
          return position == styles.indexOf(style);
        });

        // res.send(filterStyles);
        res.render("products/styles", {
           title: "Variedades",
           filterStyles,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  brands: (req, res) => {
    db.Product.findAll()
      .then((products) => {
         let brands = products.map((product) => {
           return product.brand;
         });

         let filterBrands = brands.filter((brand, position, brands) => {
           return position == brands.indexOf(brand);
         });

         // res.send(filterStyles);
         res.render("products/brands", {
           title: "Marcas",
           filterBrands,
         });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: "origin" },
        { association: "style" },
        { association: "discount" },
      ],
    })
      .then(product => {
        // res.send(product)
         res.render("products/detail", {
           title: "Detalle del producto",
           product,
         });
      })
      .catch((error) => res.send(error));
  },

  cart: (req, res) => {
    res.render("products/productCart", { title: "Carrito de compras" });
  },
};

module.exports = productsController;
