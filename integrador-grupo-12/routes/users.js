const express = require('express');
const router = express.Router();
const path = require('path'); 

//Controller
const usersController = require('../controllers/usersController');

//Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validationsRegister = require("../middlewares/validationsRegister");
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

 
//Rutas
router.get('/register', guestMiddleware, usersController.register);
router.post("/register", uploadFile.single("avatar"), validationsRegister, usersController.processRegister);

router.get('/login', guestMiddleware,usersController.login);
router.post("/login", usersController.loginProcess);

router.get('/profile/:id', authMiddleware, usersController.profile);

router.get("/edit/:id", authMiddleware, usersController.edit);
router.put("/edit/:id", uploadFile.single("avatar"), usersController.update);

router.get('/logout', usersController.logout);

router.get("/delete/:id", usersController.destroy);

module.exports = router;
