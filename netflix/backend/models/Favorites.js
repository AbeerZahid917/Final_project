const mongoose = require('mongoose');
const {Schema} = mongoose;

const FavoritesSchema = new Schema({
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

const Favorites = mongoose.model('Favorites', FavoritesSchema);
module.exports = Favorites;