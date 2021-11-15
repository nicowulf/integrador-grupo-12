const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const productsAPIController = {
  list: (req, res) => {
    db.Product.findAll({
      include: [{ association: "origin" }, { association: "style" }],
    })
      .then((allProducts) => {
        
        let products = [];

        let styles = allProducts.map((product) => {
          return product.style.style;
        });

        let countByCategory = styles.reduce((acc, style) => (acc[style] ? acc[style] += 1 : acc[style] = 1, acc), {});
        
        console.log(countByCategory)

        allProducts.forEach((data) => {
          let product = {
            id: data.id,
            brand: data.brand,
            description: data.description,
            origin: data.origin.origin,
            style: data.style.style,
            price: `$ ${data.price}`,
            image: `http://localhost:3000/images/products/${data.image}`,
            detail: `http://localhost:3000/api/products/${data.id}`,
          };
          products.push(product);
        });

        return res.json({
          meta: {
            status: 200,
            countByCategory,
            count: products.length,
            url: "/api/products",
          },
          data: {
            products,
          },
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
      .then((data) => {
        let product = {
          id: data.id,
          brand: data.brand,
          description: data.description,
          origin: data.origin.origin,
          style: data.style.style,
          image: `http://localhost:3000/images/products/${data.image}`,
          price: `$ ${data.price}`,
          discount: data.discount.discount,
        };
        return res.json({
          data: product,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
};

module.exports = productsAPIController;
