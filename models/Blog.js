const {Model, DataTypes} = require('sequelize');

const sequelize = require('./../config/connection');

class Blog extends Model {
}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;