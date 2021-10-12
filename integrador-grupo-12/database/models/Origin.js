module.exports = (sequelize, dataTypes) => {
    let alias = 'Origin';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        origin: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        
        
    };
    let config = {
        timestamps: false,
        tableName: "origins"
    }
    const Origin = sequelize.define(alias, cols, config);

    Origin.associate = models => {
        Origin.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'origin_id',  
        })
    
    }

    return Origin
};