const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminController = require('../controllers/adminController');
const path = require('path');
const { route } = require('.');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/imagenes/products'));
    },
    filename: function (req, file, cb) {
      cb(null, 'product-'+Date.now()+path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage })

router.get('/admin', adminController.index);
router.get('/admin/create', adminController.create);
router.post('/admin/create', upload.single('imagen'), adminController.save);
router.get('/admin/detail/:id', adminController.show);
router.get('/admin/edit/:id', adminController.edit);
router.put('/admin/edit/:id', upload.single('imagen'), adminController.update);
router.get('/admin/delete/:id', adminController.destroy);

module.exports = router;
