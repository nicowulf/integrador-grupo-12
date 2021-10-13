const express = require('express');
const router = express.Router();
const path = require('path'); 

//Controller
const usersController = require('../controllers/usersController');

//Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validationsMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

 
//Rutas
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

router.get('/login', guestMiddleware,usersController.login);
router.post('/login', validations, usersController.loginProcess);

router.get('/profile', authMiddleware, usersController.profile);

router.get("/edit/:id", authMiddleware, usersController.edit);
router.put("/edit/:id", uploadFile.single("avatar"), usersController.update);

router.get('/logout', usersController.logout);

router.get("/delete/:id", usersController.destroy);

module.exports = router;
