const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// const { route } = require(".");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/images/products"));
  },
  filename: function (req, file, cb) {
    cb(null, "product-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//Controller
const productsAPIController = require("../../controllers/api/productsAPIController");

//Routes
router.get("/", productsAPIController.list);

router.get("/:id", productsAPIController.detail);


// router.post(
//   "/create",
//   upload.single("image"),
//   validationsProducts,
//   productsAPIController.create
// );
// router.get("/detail/:id", productsAPIController.detail);
// router.get("/edit/:id", productsAPIController);
// router.put(
//   "/edit/:id",
//   upload.single("image"),
//   validationsProducts,
//   productsAPIController
// );
// router.get("/delete/:id", productsAPIController.destroy);

module.exports = router;
