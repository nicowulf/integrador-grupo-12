module.exports = (sequelize, dataTypes) => {
    let alias = 'Style';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        style: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
                
    };
    let config = {
        timestamps: false,
        tableName: "styles"
    }
    const Style = sequelize.define(alias, cols, config);

    Style.associate = models => {
        Style.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'style_id',  
        })
    
    }

    return Style
};