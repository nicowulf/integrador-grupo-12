module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        order_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        
        
    };
    let config = {
        timestamps: false,
        tableName: "orders"
    }
    const Order = sequelize.define(alias, cols, config);

    Order.associate = models => {
        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id',
        }),
        Order.belongsToMany(models.Product, {
            as: 'product',
            through: 'orders_products', 
            foreignKey: 'order_id',
            otherKey: 'product_id',
        })

    
    }

    return Order
};