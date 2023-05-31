const express = require('express');
const server = express();
const path = require('path');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

//require ('./config/passport')

server.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded({ extended: false }));
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cookieParser())
server.use(express.static(path.join(__dirname, 'public')))
server.use(session({
    cookie: { maxAge: 60000 },
    secret: 'codeworkrsecret',
    saveUninitialized: false,
    resave: false
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(flash());
server.use((req, res, next) => {
  res.locals.success_mesages = req.flash('success')
  res.locals.error_messages = req.flash('error')
  next()
});

server.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/main.html`);
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});