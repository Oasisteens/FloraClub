const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const dbConfig = require("./config/db");
const uploadutils = require("./models/uploadfile");
const app = express();
const natural = require('natural');
var currentIndex = 0;

const levenshteinDistance = natural.LevenshteinDistance;
 

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const uploadmiddleware = uploadutils.middleware;
 

const User = require('./models/user');
const Post = require('./models/post');
const { curry } = require('lodash');


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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
    saveUninitialized: true
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

app.get('/updateIndexprev', async (req, res) => {
    const posts = await Post.find();
    if (currentIndex > 0) {
        currentIndex -= 1;
    }
    
    req.session.save(() => {
        const post = posts[currentIndex];
    
        const html = `
        <div class="postlayout">
        ${post.pictureUrl.map(image => `<img src="./uploads/${image.filename}" alt="${image.filename}">`).join('')}
        </div>
        <div class="postcontents">
            <div class="featuredColumnContent">${post.featuredColumnContent}</div>
            <div class="featuredColumnCaptions">${post.featuredColumnCaptions}</div>
        </div>
        `;
    
        res.json({ success: true, html });
    });
});

app.get('/updateIndexnext', async (req, res) => {
    const posts = await Post.find();

    if (currentIndex < posts.length - 1) {
        currentIndex += 1;
    }

        const post = posts[currentIndex];
    
        const html = `
            <div class="postlayout">
                ${post.pictureUrl.map(image => `<img src="./uploads/${image.filename}" alt="${image.filename}">`).join('')}
            </div>
            <div class="postcontents">
                <div class="featuredColumnContent">${post.featuredColumnContent}</div>
                <div class="featuredColumnCaptions">${post.featuredColumnCaptions}</div>
            </div>
        `;
    
        res.json({ success: true, html });
});

app.get('/homescreensetup', async (req, res) => {
        const posts = await Post.find();
        const post = posts[currentIndex];
    
        const html = `
        <div class="postlayout">
        ${post.pictureUrl.map(image => `<img src="./uploads/${image.filename}" alt="${image.filename}">`).join('')}
        </div>
        <div class="postcontents">
            <div class="featuredColumnContent">${post.featuredColumnContent}</div>
            <div class="featuredColumnCaptions">${post.featuredColumnCaptions}</div>
        </div>
        `;
    
        res.json({ success: true, html });
});
 

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
    const posts = await Post.find()
    res.render('homescreen', {posts})
})

app.get('/',checkAuthenticated, async (req, res) => {
    res.render('index' , { username: req.user.username })
})

app.get('/index',checkAuthenticated, async (req,res) =>{
    res.render('index' , { username: req.user.username });
})

app.post('/upload', uploadmiddleware, async function (req, res) {
  
    // Retrieve the file numbers
    const fileNumbers = uploadutils.getFileCount();
  
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
      pictures: fileNumbers,
      pictureUrl: []
    });
  
    if (req.files && req.files.length >= 1) {
        req.files.forEach(function (file) {
          post.pictureUrl.push({
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
            size: file.size
          });
        });
      }

    await post.save();
    console.log(post.pictures)
  
    res.render('index', { username: req.body.username });
  });



  app.get('/test', (req, res) => {
    res.render('test')
  })

  app.get('/admin',checkAuthenticated, async (req, res) => {

    const users =  await User.find();
    const posts = await Post.find();

    if (req.user.admin == true) {
        res.render('admin', { users, posts, username: req.user.username })
    } else{res.redirect('homescreen')}
  })

  app.post('/searchResults', async (req, res) => {
    const search = req.body.topic;
    const posts = await Post.find();
    const matchedPost = [];

    posts.forEach((post) => {
        distance = levenshteinDistance(post.featuredColumnTitle, search)
        console.log(distance)
        if (distance < 4) {
            console.log('matched');
            matchedPost.push(post)
        }
    })
    res.render('searchResults', { posts: matchedPost })
  })

  app.get('/searchResults', async (req, res) => {
    const posts = await Post.find();
    res.render('searchResults', { posts: posts } )
  })

  app.post('/specificResults', async(req, res) => {
    const post = await Post.findOne({ featuredColumnTitle: req.body.postTitle })
    res.render('specificResults', { post });
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

  app.post('/toggleFeature', async (req, res) => {
    const postToToggle = await Post.findOne({ _id: req.body.postId })
    postToToggle.featured = !postToToggle.featured;
    await postToToggle.save();
    console.log('post toggled');
    res.redirect('/admin');
  })


app.use((req, res, next) => {
    res.status(404).render('404');
})