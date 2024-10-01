const mongoose = require('mongoose');
const { Schema } = mongoose;


const FoodItem = require('./MenuItem'); 

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        foodItem: {
            type: Schema.Types.ObjectId,
            ref: 'MenuItem',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    }],
    total: {
        type: Number,
        default: 0,  
    },
});

// Pre-save to calculate the total
cartSchema.pre('save', async function (next) {
    const cart = this;
    let total = 0;

    
    for (let item of cart.items) {
        const foodItem = await FoodItem.findById(item.foodItem);

        if (foodItem) {
            total += foodItem.price * item.quantity;
        }
    }

    // Update the cart's total field
    cart.total = total;
    next();
});

// Middleware to recalculate total on item removal
cartSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();

    if (update.items) {
        let total = 0;
        for (let item of update.items) {
            const foodItem = await FoodItem.findById(item.foodItem);
            if (foodItem) {
                total += foodItem.price * item.quantity;
            }
        }
        // Set the updated total in the query
        update.total = total;
    }
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
