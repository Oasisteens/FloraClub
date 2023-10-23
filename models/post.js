const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    featuredColumnTitle: {
        type: String
    },
    featuredColumnContent: {
        type: String
    },
    featuredColumnCaptions: {
        type: String
    },
    username: {
        type: String
    },
    featured: {
        type: Boolean
    },
    pictures: {
        type: Number
    },
    pictureUrl: [{ 
        filename: String,
        originalname: String,
        path: String,
        size: Number
      }]
});

module.exports = mongoose.model('Post', postSchema);