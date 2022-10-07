const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const BlogData = require('./BlogData.json');
const CommentData = require('./CommentData.json');
const UserData = require('./UserData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(UserData, {
        individualHooks: true,
        returning: true,
    });

    const blogs = await Blog.bulkCreate(BlogData, {
        individualHooks: true,
        returning: true,
    });

    const comment = await Comment.bulkCreate(CommentData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedAll();