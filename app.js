const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const DB = "mongodb+srv://yihaoqin:qyh7809abc@cluster0.6enxioa.mongodb.net/?retryWrites=true&w=majority";

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require('./models/user');
const Post = require('./models/post');

const initRoutes = require("./routes");

var corsOptions = {
    origin: "http://127.0.0.1:8081"
  };
  
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
app.use(session({
    secret: 'BIPHFlora',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.listen(3000, '0.0.0.0', () => {
    console.log(`Server is running on http`);
});

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
app.use(express.static('public'));

app.use((req, res, next) => {
    res.status(404).render('404');
})
