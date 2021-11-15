const db = require('../database/models');
const sequelize = db.sequelize;

const mainController = {
    index: (req,res) => {
        db.Product.findAll({
          include: [
            { association: "origin" },
            { association: "style" },
            { association: "discount" },
          ],
        })
          .then((products) => {
            res.render("main/index", { products });
          })
          .catch((e) => {
            console.log(e);
          });
        },
    
}


module.exports = mainController
