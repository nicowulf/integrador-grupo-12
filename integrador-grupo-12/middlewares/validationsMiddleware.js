const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('first_name').notEmpty().withMessage('Debes colocar tu nombre'),
	body('last_name').notEmpty().withMessage('Debes colocar tu apellido'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('confirm_password')
		.notEmpty().withMessage('Tienes que confirmar tu contraseña'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]
