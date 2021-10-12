const db = require('../database/models');
const sequelize = db.sequelize;

const mainController = {
    index: (req,res) => {
        db.Product.findAll()
            .then(products => {
                res.render('main/index', {products})
            })
            .catch(e => {
                console.log(e);
            })
        },
    
}


module.exports = mainController
