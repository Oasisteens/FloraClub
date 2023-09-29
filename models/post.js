const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    group: {
        type: String,
    },
    username: {
        type: String,
    },
    postingtime: {
        type: Date,
        default: Date.now,
        get: function(value) {
            return value.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
        },
        immutable: true,
    }
})

module.exports = mongoose.model('Post', postSchema);