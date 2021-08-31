const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const { validationResult } = require('express-validator');

const usersController = {
    login: (req, res) => {
        res.render('users/login', {
            title: 'Iniciar sesión'
        })
    },

    register: (req, res) => {
        res.render('users/register', {
            title: 'Registro'
        })
    },
    create: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = {
                nombre: req.body.first_name,
                apellido: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file ? req.file.filename : '',
                role: 1
            }
            let usersFile = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), {
                encoding: 'utf-8'
            });
            let users;
            if (usersFile == "") {
                users = [];
            } else {
                users = JSON.parse(usersFile);
            };
            users.push(user);
            usersJSON = JSON.stringify(users, null, 2);
            fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), usersJSON);
            res.render(path.resolve(__dirname, '../views/login'));
        } else {
            return res.render(path.resolve(__dirname, '../views/users/register'), {
                errors: errors.errors, old: req.body
            });
        }
    },
    ingresar: (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            let usersFile = fs.readFileSync(path.resolve(__dirname, '../data/users.json'));
            let usuarioLogueado = usersFile.find(user => user.email == req.body.email)
            delete usuarioLogueado.password;
            req.session.user = usuarioLogueado;
            if (req.body.recordarme) {
                res.cookies('email', usuarioLogueado.email, { maxAge: 1000 * 60 * 60 * 24 })
            }
            return res.redirect('/');
        } else {
            res.render(path.resolve(__dirname, '../views/login'), { errors: errors.mapped(), old: req.body });
        }
    },

    logout: (req, res) => {
        res.session.destroy();
        res.cookie('email', null, { maxAge: -1 });
        res.redirect('/users/')
    }

}


module.exports = usersController