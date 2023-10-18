const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
const DB = "mongodb://yihaoqin:qyh7809abc@ac-keqjbbu-shard-00-00.6enxioa.mongodb.net:27017,ac-keqjbbu-shard-00-01.6enxioa.mongodb.net:27017,ac-keqjbbu-shard-00-02.6enxioa.mongodb.net:27017/?ssl=true&replicaSet=atlas-5t4asc-shard-0&authSource=admin&retryWrites=true&w=majority";

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//hiii

const User = require('./models/user');

mongoose.connect(DB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });



var corsOptions = {
    origin: "http://127.0.0.1:8081"
  };
  
app.use(cors(corsOptions));
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username }); // add await
            if (!user || user.password !== password) {
                return done(null, false, {message: 'Incorrect username or password'})
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // Changed to User
        done(null, user);
    } catch(error) {
        done(error);
    }})

app.use(express.urlencoded({ extended: true }));

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

app.use(express.static('public'));

/*app.use((req, res, next) => {
    res.status(404).render('404');
})*/










/////////////////////////////////////////////////////////////////////////










const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);