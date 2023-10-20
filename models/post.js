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

});

module.exports = mongoose.model('Post', postSchema);