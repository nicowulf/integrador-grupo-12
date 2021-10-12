module.exports = (sequelize, dataTypes) => {
    let alias = 'Discount';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        discount: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
                
    };
    let config = {
        timestamps: false,
        tableName: "discounts"
    }
    const Discount = sequelize.define(alias, cols, config);

    Discount.associate = models => {
        Discount.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'discount_id',  
        })
    
    }

    return Discount
};