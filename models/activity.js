const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activityTitle: {
        type: String
    },
    activityDescription: {
        type: String
    },
    activityCaptions: {
        type: String
    }
});

module.exports = mongoose.model('Activity', activitySchema);