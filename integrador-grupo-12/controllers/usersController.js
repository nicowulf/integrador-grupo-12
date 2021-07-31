const usersController = {
    register: (req,res) => {
        res.render('users/register', {title : 'Registro'
    
        })
    },

    login: (req,res) => {
        res.render('users/login', {title : 'Iniciar sesión'
    
        })
    },
    
}


module.exports = usersController