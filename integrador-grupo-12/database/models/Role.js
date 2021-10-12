module.exports = (sequelize, dataTypes) => {
    let alias = 'Role';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        
        
    };
    let config = {
        timestamps: false,
        tableName: "roles"
    }
    const Role = sequelize.define(alias, cols, config);

    Role.associate = models => {
        Role.hasMany(models.User, {
            as: 'users',
            foreignKey: 'role_id',
            
       })
    }

    return Role
};