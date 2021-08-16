const path = require('path');
const fs = require('fs');
let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
const adminController = {
    index: (req,res) => {
        res.render(path.resolve(__dirname,'../views/admin/admin'), {products});
    },
}

module.exports = adminController;