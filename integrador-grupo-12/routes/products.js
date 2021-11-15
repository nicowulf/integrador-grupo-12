const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController')

router.get('/', productsController.all);
router.get("/national", productsController.national);
router.get("/international", productsController.international);

router.get("/styles", productsController.styles);
router.get("/brands", productsController.brands);

router.get('/detail/:id', productsController.detail);

router.get('/productCart', productsController.cart);

module.exports = router;