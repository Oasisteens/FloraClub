const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');

const mongooseLink = 'mongodb+srv://yihaoqin:qyh7809abc@cluster0.6enxioa.mongodb.net/'
const app = express();

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const bodyParser = require('body-parser')

mongoose.connect(mongooseLink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });



const initRoutes = require("./routes"); 

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
    }
})
var corsOptions = {
    origin: "http://127.0.0.1:8080"
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

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

function checkLoginAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');
}

    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try{
                const user = await User.findOne({ username });
                if (!user || user.password !== password) {
                    return done(null, false, {message: 'Incorrect username or password'})
                }
                return done(null, user);
            } catch(error) {
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
        }
    })

    app.use(express.urlencoded({ extended: true }));
    app.use(session({
        secret: 'floraCode',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.set('view engine', 'ejs');
    app.listen(3000, '0.0.0.0', ()  => {
        console.log("Server running on port 3000");
    });

    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login')
    };

    app.use(express.static('public'));



