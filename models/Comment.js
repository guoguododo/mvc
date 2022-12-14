const { Model, DataTypes } = require('sequelize');

const sequelize = require('./../config/connection');

class Comment extends Model {
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        blog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blogs',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;