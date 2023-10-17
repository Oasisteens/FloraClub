const express = require('express');
const app = express();

const mongoose = require('mongoose');
const mongooseLink = 'mongodb+srv://jess:jess@cluster0.cgg9ypb.mongodb.net/?retryWrites=true&w=majority'

const session = require('express-session');
const passport = require('passport');
