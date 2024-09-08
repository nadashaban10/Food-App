const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        foodItem: {
            type: Schema.Types.ObjectId,
            ref: 'FoodItem',
            required: true,
        },
    }],
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
