const path = require("path");
const { body } = require("express-validator");

module.exports = [
  body("brand")
    .notEmpty()
    .withMessage("Debes colocar la Marca")
    .bail()
    .isLength({ min: 5 })
    .withMessage("La Marca debe tener al menos 5 caracteres"),
  body("description")
    .notEmpty()
    .withMessage("Debes colocar una descripción")
    .bail()
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),
  body("origin_id").notEmpty().withMessage("Debes elegir un Origen"),
  body("style_id").notEmpty().withMessage("Debes elegir una Variedad"),
  body("price").notEmpty().withMessage("Debes colocar el precio"),
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }

    return true;
  }),
];
