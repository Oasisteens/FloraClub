const express = require('express');
const app = express();

const mongoose = require('mongoose');
const mongooseLink = 'mongodb+srv://yihaoqin:qyh7809abc@cluster0.6enxioa.mongodb.net/'
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
