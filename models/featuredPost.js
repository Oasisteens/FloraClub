const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featuredPostSchema = new Schema({
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
    pictures: {
        type: Number
    },
    pictureUrl: [{ 
        type: Array
      }]
});

module.exports = mongoose.model('FeaturedPost', featuredPostSchema);