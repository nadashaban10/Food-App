const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
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
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
