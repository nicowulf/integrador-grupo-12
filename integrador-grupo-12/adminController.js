const path = require('path');
const fs = require('fs');
const { validationResult } = require("express-validator");

const db = require('../database/models');
const sequelize = db.sequelize;

const adminController = {
  index: (req, res) => {
    db.Product.findAll()
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
          res.redirect("admin");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },

  // db.Product.create(req.body)

  show: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then((data) => {
        res.render("admin/detail", { product: data });
      })
      .catch((e) => {
        console.log(e);
      });
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
      .catch((e) => {
        console.log(e);
      });
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
        image: req.file.filename,
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
        res.render("/admin/admin");
      })
      .catch((e) => {
        console.log(e);
      });
  },
  destroy: function (req, res) {
    db.Product.destroy({
      where: { id: req.params.id },
    })
      .then(() => {
        res.redirect("admin");
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
  
module.exports = adminController;
  
//const adminController = {
//     index: (req,res) => {
//         let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
//         res.render(path.resolve(__dirname,'../views/admin/admin'), {title: "Administrar", products});
//     },
//     create: (req,res) => {
//         let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
//         res.render(path.resolve(__dirname, '../views/admin/create'), {title: "Crear"});
//     },
//     save: (req,res) => {
//         let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
//         let lastProduct = products.pop();
//         products.push(lastProduct);
//         let newProduct = {
//             id: lastProduct.id +1,
//             nombre: req.body.nombre,
//             descripcion: req.body.descripcion,
//             origen: req.body.origen,
//             precio: req.body.precio,
//             descuento: req.body.descuento,
//             imagen: req.file.filename
//         }

//         products.push(newProduct);
//         let newProductSave = JSON.stringify(products,null,2);
//         fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), newProductSave);
//         res.redirect('/admin');
//     }, 
//     show: (req,res) => {
//         let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
//         let myProduct;
//         products.forEach(product => {
//             if(product.id == req.params.id) {
//                 myProduct = product;
//             }
            
//         });

//         res.render(path.resolve(__dirname, '../views/admin/detail'), {
//             title: "Product", 
//             myProduct});
//     },

//     edit: (req,res) => {
//         let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
//         let productEdit = products.find(product=> product.id == req.params.id);


//         res.render(path.resolve(__dirname, '../views/admin/edit'), {
//             title: "Edit",
//             productEdit
//         });

//     },

//     update: (req,res) => {
//         let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
//         req.body.id = req.params.id;
//         req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
//         let productUpdate = products.map(product => {
//             if(product.id == req.body.id) {
//                 return product = req.body;
//             }
//             return product;
//         })
//         let productActualziar = JSON.stringify(productUpdate, null,2);
//         fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), productActualziar);
//         res.redirect('/admin');
//     },

//     destroy: (req,res) => {
//         let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
//         const productDeleteId = req.params.id;
//         const productsFinal = products.filter(product => product.id != productDeleteId);
//         let productsSave = JSON.stringify(productsFinal,null,2);
//         fs.writeFileSync(path.resolve(__dirname, '../data/products.json'), productsSave);
//         res.redirect('/admin');
//     }

// }
