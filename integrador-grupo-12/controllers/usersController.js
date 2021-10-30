const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require("../helpers/User");

const db = require("../database/models");

const usersController = {
  all: function () {
    db.User.findAll({
      include: [{ association: "roles" }, { association: "orders" }],
    }).then(function (users) {
      return users;
    });
  },

  findByfield: function (field, value) {
    let users = this.all();
    let userFound = users.find((user) => user[field] === value);
    return userFound;
  },

  findBypk: function (id) {
    return this.findByfield("id", id);
  },

  register: (req, res) => {
    let users = db.User.findAll();
    let roles = db.Role.findAll();
    Promise.all([users]).then(function () {
      res.render("users/register", {
        title: "Registro",
      });
    });
  },

  processRegister: (req, res) => {
    const resultValidations = validationResult(req);

    if (resultValidations.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidations.mapped(),
        oldData: req.body,
      });
    }

    let userToCreate = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      confirm_password: bcryptjs.hashSync(req.body.confirm_password, 10),
      avatar: req.file.filename,
      role_id: 1,
    };

    db.User.create(userToCreate)
      .then(() => {
        return res.redirect("../users/profile/:id");
      })
      .catch((e) => {
        console.log(e);
      });
  },

  login: (req, res) => {
    res.render("users/login", { title: "Iniciar sesión" });
  },

  loginProcess: (req, res) => {
    let userToLogin = db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((userToLogin) => {
        if (userToLogin) {
          let passwordOk = bcryptjs.compareSync(
            req.body.password,
            userToLogin.password
          );

          if (passwordOk) {
            delete userToLogin.password;
            req.session.userLogged = userToLogin;
            let id = userToLogin.id;
            
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });

            return res.redirect("../users/profile/" + id);
          } else {
            return res.render("users/login", {
              errors: {
                email: {
                  msg: "Contraseña o usuario incorrecto",
                },
                password: {
                  msg: "Contraseña o usuario incorrecto",
                },
              },
            });
          }
        }

        return res.render("user/login", {
          errors: {
            email: {
              msg: "Usuario no registrado",
            },
          },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  profile: (req, res) => {
    
    return res.render("users/profile", {
      userLogged: req.session.userLogged,
    });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("../");
  },

  edit: function (req, res) {
    let id = req.params.id
    let userToEdit = db.User.findByPk(id)
      .then((userToEdit) => {
        return res.render("users/edit", {
          userToEdit,
          role_id: 1,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  update: (req, res) => {
    
    const resultadoValidaciones = validationResult(req);
    if (resultadoValidaciones.errors.length > 0) {
      return res.render("users/edit", {
        errors: resultadoValidaciones.mapped(),
        oldData: req.body,
      });
    } else{
      let userToEdit = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        avatar: req.file ? req.file.filename : req.body.oldImagen,
      };

      db.User.update(userToEdit, { where: { id: req.params.id } })
        .then(() => res.redirect("../profile/" + req.params.id))
        .catch((e) => {
          console.log(e);
        });
    }

    
  },
  
  destroy: function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("../");
  },
};


module.exports = usersController