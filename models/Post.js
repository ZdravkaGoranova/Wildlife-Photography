const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        // minLength: 10, 
        // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid URL'],
        required: [true, 'title is required!'],

    },
    keyword: {
        type: String,
        required: [true, 'Password is required!'],
        //minLength: 3,
    },
    location: {
        type: String,
        required: [true, 'title is required!'],
        // enum: {
        //     values: ['female', 'male'],
        //     message: 'Invalid gender',
        // },
        // required: true,
    },
    creation: {
        type: String,
        // enum: {
        //     values: ['female', 'male'],
        //     message: 'Invalid gender',
        // },
        required: true,
    },
    image: {
        type: String,
        // enum: {
        //     values: ['female', 'male'],
        //     message: 'Invalid gender',
        // },
        required: true,
    },
    description: {
        type: String,

        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    votesPpost : [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
    ,
    ratingofPost: {
        type: Number,
        min: 0,
    },
});

//userShema.virtual('confirmPassword').set;


const Post = mongoose.model('Post', bookSchema);

module.exports = Post;