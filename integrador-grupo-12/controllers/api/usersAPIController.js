const path = require("path");
const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");

const usersAPIController = {
  list: (req, res) => {
    db.User.findAll()
       .then(allUsers => {
         let users = [];
         allUsers.forEach((element) => {
           let user = {
             id: element.id,
             first_name: element.first_name,
             last_name: element.last_name,
             email: element.email,
             avatar: `http://localhost:3000/images/usuarios/${element.avatar}`,
             detail: `http://localhost:3000/api/users/${element.id}`,
           };
           users.push(user);
         });
        
         return res.json({
           meta: {
             status: 200,
             count: users.length,
             url: '/api/users'
           },
           data: {
             users
           },
         })
       })
       .catch((e) => {
         console.log(e);
       });
  },

detail: (req, res) => {
    db.User.findByPk(req.params.id)
       .then((data => {
          let user = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            avatar: `http://localhost:3000/images/usuarios/${data.avatar}`,
          };
        return res.json({
          data: user
        })

        }))
        .catch((e) => {
         console.log(e);
        })
        
  }
}

module.exports = usersAPIController;



