module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        confirm_password: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        role_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
        
    };
    let config = {
        timestamps: false,
        tableName: "users"
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = models => {
        User.belongsTo(models.Role, {
            as: 'roles',
            foreignKey: 'role_id',
            
       })
        User.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'user_id',
            
       })

    
    }

    return User
};