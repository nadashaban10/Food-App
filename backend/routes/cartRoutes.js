const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Your Cart model

// Add items to the cart or update the cart
router.post('/', async (req, res) => {
    try {
        const { user, items } = req.body;

        // Check if the cart already exists for the user
        let cart = await Cart.findOne({ user });

        if (cart) {
            // If the cart exists, update the items and total
            cart.items = items;
        } else {
            // If no cart exists, create a new cart
            cart = new Cart({
                user,
                items
            });
        }

        // Save the cart (total will be calculated automatically by the pre-save hook)
        await cart.save();

        return res.status(201).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get all carts (for testing purposes, you might restrict this to admin later)
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('items.foodItem');
        return res.status(200).json(carts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get a cart by user ID
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ user: userId }).populate('items.foodItem');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Update cart items (e.g., change quantities)
router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { items } = req.body;

        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { items: items }, // Replace the cart's items with the updated ones
            { new: true }
        ).populate('items.foodItem'); // To include foodItem details

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json(updatedCart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Delete an item from the cart
router.delete('/:userId/item/:foodItemId', async (req, res) => {
    try {
        const { userId, foodItemId } = req.params;

        // Find the cart by user ID
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item with the specified foodItemId
        cart.items = cart.items.filter(item => item.foodItem.toString() !== foodItemId);

        // Save the updated cart (this will trigger the pre-save hook to recalculate total)
        await cart.save();

        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Delete the entire cart for a user
router.delete('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOneAndDelete({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json({ message: 'Cart deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
