const mongoose = require('mongoose');


const userShema = new mongoose.Schema({

    firstName: {
        type: String,
        // minLength: 10, 
        // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid URL'],
        required: [true, 'title is required!'],

    },
    lastName: {
        type: String,
        required: [true, 'Password is required!'],
        //minLength: 3,
    },
    email: {
        type: String,
        required: [true, 'title is required!'],
        // enum: {
        //     values: ['female', 'male'],
        //     message: 'Invalid gender',
        // },
        
    },
    password: {
        type: String,
        required: [true, 'title is required!'],
        // enum: {
        //     values: ['female', 'male'],
        //     message: 'Invalid gender',
        // },
       
    },
    myPostsage: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
    
});

//userShema.virtual('confirmPassword').set;

const User = mongoose.model('User', userShema);

module.exports = User;



  // }, {
    //     virtuals: {
    //         confirmPassword: {
    //             set(value) {
    //                 if (this.password !== value) {
    //                     throw new mongoose.Error('Password missmatch!');
    //                 }
    //             }
    //         }
    //     }

//});

//userShema.virtual('confirmPassword').set;