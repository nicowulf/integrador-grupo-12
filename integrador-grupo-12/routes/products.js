const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

router.get('/', productsController.todos);

router.get('/productDetail/:id', productsController.detalle);

router.get('/productCart', productsController.carrito);

module.exports = router;