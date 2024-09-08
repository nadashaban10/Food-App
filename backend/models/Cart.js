const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
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
        quantity: {
            type: Number,
            required: true,
        },
    }],
    total: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Cart', cartSchema);
