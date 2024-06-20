const mongoose = require('mongoose');

const Video = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the title of the movie'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character long']
    },
    description: {
        type: String,
        required: [true, 'Please enter the description of the movie'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character long']
    },
    actors: {
        type: String,
        required: [true, 'Please enter the actors of the movie'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character long']
    },
    category: {
        type: String,
        required: [true, 'Please enter the category of the movie'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character long']
    },
    director: {
        type: String,
        required: [true, 'Please enter the director of the movie'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character long']
    },
    createdAt: {
        type: String,
        required: [true, 'Please enter the data of creation'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character long']
    },
});

module.exports = mongoose.model('Video', Video);
