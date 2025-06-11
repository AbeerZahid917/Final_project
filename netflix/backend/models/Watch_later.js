const mongoose = require('mongoose');
const {Schema} = mongoose;

const WatchLaterSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    movieId: {
        type: String, 
        required: true
    },
    title: String,
    posterPath: String,
    Date: {
        type: Date,
        default: Date.now
    }
});

const Watch_later = mongoose.model('Watch_later', WatchLaterSchema);
module.exports = Watch_later;