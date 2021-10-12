module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        prod_name: {
            type: dataTypes.STRING(100),
            allowNull: true
        },
        description: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        alcohol: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: true
        },
        bitterness: {
            type: dataTypes.STRING(50),
            allowNull: true
        },
        ibu: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        discount_id: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        origin_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        style_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
        
    };
    let config = {
        timestamps: false,
        tableName: "products",
        //underscored: true
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = models => {
        Product.belongsTo(models.Style, {
            as: 'style',
            through: 'style_id'
            
        }),
        Product.belongsTo(models.Origin, {
            as: 'origin',
            through: 'origin_id'
            
        }),
        Product.belongsTo(models.Discount, {
            as: 'discount',
            through: 'discount_id'
            
        }),
        Product.belongsToMany(models.Order, {
            as: 'order',
            through: 'orders_products', 
            foreignKey: 'product_id',
            otherKey: 'order_id',
        })
    
    }

    return Product
};