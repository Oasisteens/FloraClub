const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const dbConfig = require("./config/db");
const uploadutils = require("./models/uploadfile");
const app = express();
 

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const uploadmiddleware = uploadutils.upload.array('files');


 

const User = require('./models/user');
const Post = require('./models/post');

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
mongoose.connect(dbConfig.url)
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

app.get('/homescreen', checkAuthenticated, async (req, res) => {
    const posts = await Post.find()
    res.render('homescreen', {username: req.user.username, posts})
})

app.get('/',checkAuthenticated, async (req, res) => {
    res.render('index' , { username: req.user.username })
})

app.get('/index',checkAuthenticated, async (req,res) =>{
    res.render('index' , { username: req.user.username });
})

app.post('/upload', uploadmiddleware, async function (req, res) {
    let fileData = [];
    
    if (req.files && req.files.length >= 1) {
      for (let i = 0; i < req.files.length; i++) {
        fileData.push({
          filename: req.files[i].filename,
          originalname: req.files[i].originalname,
          path: req.files[i].path,
          size: req.files[i].size
        });
      }
    }
  
    // Retrieve the file numbers
    const fileNumbers = fileData.map(file => uploadutils.getFileNumber());
  
    if (req.body.featured == null || req.body.featured == false) {
      var isFeatured = false;
    } else {
      var isFeatured = true;
    }
  
    const post = new Post({
      featuredColumnTitle: req.body.featuredColumnTitle,
      featuredColumnContent: req.body.featuredColumnContent,
      featuredColumnCaptions: req.body.featuredColumnCaptions,
      username: req.body.username,
      featured: isFeatured,
      pictures: fileNumbers // Use the file numbers as the value for pictures array
    });
  
    await post.save();
    console.log(post.pictures)
  
    res.render('index', { username: req.body.username });
  });

  app.post('/searchResults', async (req, res) => {
    res.render('searchResults')
  })

  app.get('/test', (req, res) => {
    res.render('test')
  })

  app.get('/admin',checkAuthenticated, async (req, res) => {

    const users =  await User.find();
    const posts = await Post.find();

    if (req.user.admin == true) {
        res.render('admin', { users, posts })
    } else{res.redirect('homescreen')}
  })
 

  app.post('/deletePost', async (req, res) => {
    console.log(req.body.postId)
    postToDelete = Post.find({ _id: req.body.postId })
    await Post.deleteOne({ _id: req.body.postId})
    res.redirect('/admin')
  })

  app.post('/deleteUser', async (req, res) => {
    console.log('delete request');
    await User.deleteOne({ username: req.body.username });
    res.redirect('/admin');
  })

  app.post('/toggleAdmin', async (req, res) => {
    const userToToggle = await User.findOne({ username: req.body.username });
    userToToggle.admin = !userToToggle.admin;
    await userToToggle.save();
    console.log('admin toggled');
    res.redirect('/admin');
  })

/*app.use((req, res, next) => {
    res.status(404).render('404');
})*/