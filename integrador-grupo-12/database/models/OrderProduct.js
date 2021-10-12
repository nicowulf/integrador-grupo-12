module.exports = (sequelize, dataTypes) => {
    let alias = 'OrderProduct';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        
        
    };
    let config = {
        timestamps: false,
        tableName: "orders_products"
    }
    const OrderProduct = sequelize.define(alias, cols, config);

    
    return OrderProduct
};