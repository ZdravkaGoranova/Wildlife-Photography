const mongoose = require('mongoose');


const userShema = new mongoose.Schema({

    email: {
        type: String,
        // minLength: 10, 
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid URL'],
        required: [true, 'Email is required!'],

    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        //minLength: 3,
    },
    gender: {
        type: String,
        enum: {
            values: ['female', 'male'],
            message: 'Invalid gender',
        },
       // required: true,
    },
    history: {
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
    },
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