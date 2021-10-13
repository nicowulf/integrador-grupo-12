const fs = require('fs');
const path = require('path');
const db = require('../database/models');

    const User = {
      all: function () {
        db.Usuario.findAll({
          include: [{ association: "states" }, { association: "roles" }],
        }).then(function (usuarios) {
          return usuarios;
        });
      },

      findByfield: function (field, value) {
        let users = this.all();
        let userFound = users.find((user) => user[field] === value);
        return usuarioEncontrado;
      },

      findBypk: function (id) {
        
        return this.findBypk("id", id);
      },
    };

