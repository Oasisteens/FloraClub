const express = require('express');
const mongoose = require('mongoose');
const app = express();
const DB = "mongodb+srv://yihaoqin:qyh7809abc@cluster0.6enxioa.mongodb.net/?retryWrites=true&w=majority";

 

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const initRoutes = require("./routes");

 

 

const User = require('./models/user');

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
mongoose.connect(DB, { w: 'majority', useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
app.use(express.static('public'));

 

app.get('/register', (req, res) => {
    res.render('register')
})

 

app.post('/register', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send('Username or password missing');
        }
        const adminCode = req.body.adminCode
        let adminStatus = false
        if (adminCode == 'Flora1234') {adminStatus = true}
        const user = new User({username: req.body.username, password: req.body.password, admin: adminStatus});
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).send('Internal server error');
    }
})

 

app.get('/login', async (req, res) => {
    const ip_address = req.ip || req.connection.remoteAddress;
    if (req.isAuthenticated()) {
        return res.redirect('/homescreen');
    }
    res.render('login');
})

 

app.post('/login', passport.authenticate('local', {
    successRedirect: '/homescreen',
    failureRedirect: '/login',
  }));

app.get('/homescreen', async (req, res) => {
    res.render('homescreen')
})

 

app.use((req, res, next) => {
    res.status(404).render('404');
})













initRoutes(app);