const path = require('path');
const { body } = require('express-validator');
const db = require("../database/models");

module.exports = [
  body("first_name")
    .notEmpty()
    .withMessage("Debes colocar tu nombre")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener un mínimo de 2 caracteres"),
  body("last_name")
    .notEmpty()
    .withMessage("Debes colocar tu apellido")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener un mínimo de 2 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("Tienes que escribir un correo electrónico")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido")
    .bail()
    // .custom((value, { req }) => {
    //    return db.User.findOne({
    //      where: {
    //        email: req.body.email,
    //      }.then(() => {
           
    //         if (value == mailInDb) {
    //           throw new Error(
    //             "El mail ya se encuentra registrado, por favor elige otro"
    //           )
    //        }
    //      }),
    //    })
    //  })
    ,

  body("password")
    .notEmpty()
    .withMessage("Tienes que escribir una contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
  body("confirm_password")
    .notEmpty()
    .withMessage("Tienes que confirmar tu contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage(
      "La confirmación de la contraseña debe tener un mínimo de 8 caracteres"
    )
    .bail()
    .custom((value, { req }) => {
      if (req.body.password == value) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Las contraseñas deben ser iguales"),
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

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
