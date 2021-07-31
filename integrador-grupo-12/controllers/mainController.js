const mainController = {
    home: (req,res) => {
        res.render('main/index', {title : 'Bienvenidos a BirraHaus'
    
        })
    },

    contact: (req,res) => {
        res.render('main/contact', {title : 'Contacto'
            

        })
    }, 
    
}


module.exports = mainController