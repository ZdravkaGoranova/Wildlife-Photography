
const router = require('express').Router();
const mongoose = require('mongoose');

const Post = require('../models/Post.js');
const User = require('../models/User.js');
const tripServices = require('../services/bookServices.js');
const tripUtils = require('../utils/bookUtils.js');
const { getErrorMessage } = require('../utils/errorUtils.js')
const { isAuth, authentication } = require('../middlewares/authMddleware.js');


exports.getCreateCrypto = (req, res) => {//router.get('/'create',isAuth,(req, res))=>{
    console.log(req.user);

    res.render('book/create');
};
exports.postCreateCrypto = async (req, res) => {
    // console.log(req.body);//Object на данните от url
    console.log(req.user);

    try {
        const { title, keyword, location, creation, image, description } = req.body;

        let post = new Post({
            title,
            keyword,
            location,
            creation,
            image,
            description,

            creator: req.user._id,
        });
        console.log(post);
        await post.save();//запазва в db

        //или 
        //await cryptoService.create(req.user._id, { name, image, price, description, paymentMethod })

    } catch (error) {
        console.log(error.message);
        //return res.render('auth/404');
        return res.status(400).render('book/create', { error: getErrorMessage(error) })
    }
    res.redirect('/catalog');
};

exports.getDetails = async (req, res) => {//router.get('/:cryptoId/details',(req,res)=>{)
    console.log(req.params.tripId)

    const postId = req.params.tripId;
    const postObjectId = mongoose.Types.ObjectId(postId);
    //console.log(postObjectId)

    const post = await Post.findById(postObjectId).lean();
    console.log(post)

    const isOwner = tripUtils.isOwner(req.user, post);//const isOwner = crypto.owner==req.user._id;
    console.log(isOwner)

    const isVoted = post.votesPonPpost?.some(id => id == req.user?._id);
    console.log(isVoted)

    const nameFr = await tripUtils



    // const dDriver = await tripServices.getOwn(post.creator.toString());
    // const driver = dDriver.email;
    // console.log(driver)


    //const availableSeats = post.seats;
    //console.log(availableSeats)

    
    
    // const isBuddies = post.buddies?.some(id => id == req.user?._id);
    // //console.log(isBuddies)




    // const buddiesMeail = await tripServices.getBuddiesMail(req.params.tripId);
    // // console.log(req.params.tripId)
    // console.log(buddiesMeail)

    // //console.log(buddiesMeail.buddies)

    // const buddiesEmails = buddiesMeail.buddies.map(buddy => buddy.email);
    // //console.log(buddiesEmails);




    // const sharedBuddiesString = buddiesEmails.join(', ');
    // //console.log(sharedBuddiesString);

    //crypto.paymentMethod = paymentMethodsMap[crypto.paymentMethod]

    if (!post) {
        return res.render('home/404');
    }

    // console.log(req.user._id); // console.log(req.params);// console.log(req.params.cryptoId);
    // console.log(`=========================================`)
    // console.log(crypto.owner.toString())

    res.render('book/details', { post, isOwner,isVoted });
};

exports.getEditCrypto = async (req, res) => {

    const post = await tripServices.getOne(req.params.tripId);
    //const paymentMethods = tripUtils.generatePaymentMethod(trip.paymentMethod);

    if (!tripUtils.isOwner(req.user, post)) {
        return res.render('home/404')// throw new Error('You are not an owner!');
    }

    res.render('book/edit', { post });
};

exports.postEditCrypto = async (req, res) => {

    const { title, keyword, location, creation, image, description } = req.body

    try {
        await tripServices.update(req.params.tripId, {
            title, keyword, location, creation, image, description
        })
    } catch (error) {
        // console.log(error.message);
        return res.status(400).render('book/edit', { error: getErrorMessage(error) })

    }
    res.redirect(`/sharedTrips/${req.params.tripId}/details`);
};

exports.getDeleteCrypto = async (req, res) => {
    console.log(req.params.tripId)
    const post = await tripServices.getOne(req.params.tripId);
    console.log(post)
    // const postId = req.params.tripId;
    // const postObjectId = mongoose.Types.ObjectId(postId);
    // //console.log(postObjectId)

    // const post = await Post.findById(postObjectId).lean();
    const isOwner = tripUtils.isOwner(req.user, post);//const isOwner = crypto.owner==req.user._id;
    console.log(isOwner)



    if (!isOwner) {
        return res.render('home/404');
    }

    await tripServices.delete(req.params.tripId);//await cryptoService.delete(crypto);
    res.redirect('/catalog');
};

// exports.getWish = async (req, res) => {//router.get('/:cryptoId/buy',isAuth)
//     // const crypto = await cryptoService.getOne(req.params.cryptoId);
//     // const isOwner = cryptoUtils.isOwner(req.user, crypto);
//     try {
//         await tripServices.wish(req.user._id, req.params.tripId, req, res);
//     } catch (error) {
//         return res.status(400).render('home/404', { error: getErrorMessage(error) })
//     }
//     res.redirect(`/sharedTrips/${req.params.tripId}/details`);
// }


exports.getJoin = async (req, res) => {//router.get('/:cryptoId/buy',isAuth)
    // const crypto = await cryptoService.getOne(req.params.cryptoId);
    // const isOwner = cryptoUtils.isOwner(req.user, crypto);
    try {
        await tripServices.join(req.user._id, req.params.tripId, req, res);
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) })
    }
    res.redirect(`/sharedTrips/${req.params.tripId}/details`);
}


exports.getProfile = async (req, res) => {

    const userId = req.user._id;
    const user = req.user;

    const mywished = await tripServices.getbBuddies(userId)
    const length = mywished.length;


    console.log(userId)
    // console.log(wished)
    console.log(mywished)
    console.log(length)
    console.log(user)

    res.render('book/profile', { user, mywished, length });

}


//     try {
//         const userI = req.user._id;
//         const user = req.user;
//         let books = await Book.find().lean();
//         // const wishArray  = books.wishingList?.filter(id => id == req.user?._id);

//        //const filteredArray = books.filter(book => book.wishingList.includes(new ObjectId('req.user._id')));
//        const filteredArray = books.filter(book => book.wishingList.includes('req.user._id'));

//         console.log(req.user._id)
//         console.log(filteredArray);

//         res.render('book/profile', { user, books });
//     } catch (error) {

//         return res.status(400).render('home/404', { error: getErrorMessage(error) })
//     }
// }