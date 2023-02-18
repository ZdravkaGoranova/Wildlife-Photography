const Trip = require('../models/Trip.js');
const User = require('../models/User.js');

const bookUtils = require('../utils/bookUtils.js');

exports.search = async (name, paymentMethod) => {

    let cprypto = await this.getAll();

    if (name) {
        cprypto = cprypto.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }

    if (paymentMethod) {
        cprypto = cprypto.filter(x => x.paymentMethod == paymentMethod)
    }
    return cprypto;
};

exports.getOwn = (bookId) => User.findById(bookId).lean();


exports.getAll = () => Trip.find({}).lean();

exports.create = (ownerId, cryptoData) => Trip.create({ ...cryptoData, owner: ownerId });

exports.getOne = (bookId) => Trip.findById(bookId).lean();

exports.update = (bookId, data) => Trip.findByIdAndUpdate(bookId, data, { runValidators: true });

exports.delete = (bookId) => Trip.findByIdAndDelete(bookId);



exports.getBuddiesMail = (userId) => Trip.findById(userId).lean().populate({ path: 'buddies', select: 'email' });

exports.join = async (userId, tripId, req, res) => {
    const trip = await Trip.findById(tripId);
    const isOwner = trip.owner == req.user._id;
    const isBuddies = trip.buddies?.some(id => id == req.user?._id);
    // const isWish  = book.wishingList?.filter(id => id == req.user?._id);

    if (isOwner) {
        return res.render('home/404');
        //throw new Error ('You is Owner')
    }
    if (isBuddies) {
        return res.render('home/404');
        // throw new Error ('You already bought these crypto coins.')
    }

    trip.buddies.push(userId);
    return await trip.save();

    //console.log(crypto.buyers)
    //или Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })
};



// exports.wish = async (userId, bookId, req, res) => {


exports.getbBuddies = (userId) => Trip.find({ buddies: userId }).lean();

//     const book = await Trip.findById(bookId);
//     const isOwner = book.owner == req.user._id;
//     const isWish = book.wishingList?.some(id => id == req.user?._id);
//     // const isWish  = book.wishingList?.filter(id => id == req.user?._id);

//     if (isOwner) {
//         return res.render('home/404');
//         //throw new Error ('You is Owner')
//     }
//     if (isWish) {
//         return res.render('home/404');
//         // throw new Error ('You already bought these crypto coins.')
//     }

//     book.wishingList.push(userId);
//     return await book.save();
//     //console.log(crypto.buyers)
//     //или Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })
// };