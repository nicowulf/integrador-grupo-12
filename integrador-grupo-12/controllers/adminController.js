const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");

const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const adminController = {
  index: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "origin" },
        { association: "style" },
        { association: "discount" },
      ],
    })
      .then((products) => {
        res.render("admin/admin", { products });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  // lista: (req, res) => {
  //   db.Product.findAll().then(function (product) {
  //     res.render("admin/listaEdit", { Product: product });
  //   });
  // },

  create: (req, res) => {
    let styleList = db.Style.findAll();
    let originList = db.Origin.findAll();
    let discountList = db.Discount.findAll();
    Promise.all([styleList, originList, discountList])
      .then(function ([style, origin, discount]) {
        res.render("admin/create", {
          title: "Agregar productos",
          style: style,
          origin: origin,
          discount: discount,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  save: function (req, res) {
    //res.send(req.body);

    const resultadosValidacion = validationResult(req);
    if (resultadosValidacion.errors.length > 0) {
      let styleList = db.Style.findAll();
      let originList = db.Origin.findAll();
      let discountList = db.Discount.findAll();
      Promise.all([styleList, originList, discountList]).then(function ([
        style,
        origin,
        discount,
      ]) {
        return res.render("admin/create", {
          title: "Agregar productos",
          style: style,
          origin: origin,
          discount: discount,
          errors: resultadosValidacion.mapped(),
          oldData: req.body,
        });
      });
    } else {
      db.Product.create({
        brand: req.body.brand,
        prod_name: req.body.prod_name,
        description: req.body.description,
        alcohol: req.body.alcohol,
        bitterness: req.body.bitterness,
        ibu: req.body.ibu,
        image: req.file.filename,
        origin_id: parseInt(req.body.origin_id),
        style_id: parseInt(req.body.style_id),
        price: req.body.price,
        discount_id: parseInt(req.body.discount_id),
      })

        .then(() => {
          res.redirect("../admin");
        })
        .catch((error) => res.send(error));
    }
  },

  show: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: [
        { association: "origin" },
        { association: "style" },
        { association: "discount" },
      ],
    })
      .then((product) => {
        res.render(path.resolve(__dirname, "..", "views", "admin", "detail"), {
          product,
        });
      })
      .catch((error) => res.send(error));
  },

  edit: function (req, res) {
    let id = req.params.id;
    let productToEdit = db.Product.findByPk(id);
    let style = db.Style.findAll();
    let origin = db.Origin.findAll();
    let discount = db.Discount.findAll();

    Promise.all([productToEdit, style, origin, discount])
      .then(([productToEdit, style, origin, discount]) => {
        res.render("admin/edit", { productToEdit, style, origin, discount });
      })
      .catch((error) => res.send(error));
  },

  update: function (req, res) {
    db.Product.update(
      {
        brand: req.body.brand,
        prod_name: req.body.prod_name,
        description: req.body.description,
        alcohol: req.body.alcohol,
        bitterness: req.body.bitterness,
        ibu: req.body.ibu,
        image: req.file ? req.file.filename : req.body.oldImagen,
        origin_id: parseInt(req.body.origin_id),
        style_id: parseInt(req.body.style_id),
        price: req.body.price,
        discount_id: parseInt(req.body.discount_id),
      },

      {
        where: { id: req.params.id },
      }
    )
      .then(() => {
        res.redirect("../");
      })
      .catch((error) => res.send(error));
  },

  destroy: function (req, res) {
    db.Product.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        res.redirect("admin");
      })
      .catch((error) => res.send(error));
  },

  search: (req, res) => {
    db.Product.findAll({
      include: [
        { association: "origin" },
        { association: "style" },
        { association: "discount" },
      ],
      where: {
        name: { [Op.like]: `%${req.query.search}%` },
      },
    })
      .then((resultado) => {
        res.render(
          path.resolve(__dirname, "..", "views", "admin", "administrar"),
          { productos: resultado }
        );
      })
      .catch((error) => res.send(error));
  },
};
  
module.exports = adminController;