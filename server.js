require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');
const routes = require('./controllers');


const helpers = require('./utils/helpers');

const hbs = exphbs.create({
    helpers,
});

const sessionSettings = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        expires: 10 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

const app = express();

const PORT = process.env.PORT || 3002;

// Template Engine Setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.static('public'));
app.use(session(sessionSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('🌍 Now listening, and Server Up'));
});