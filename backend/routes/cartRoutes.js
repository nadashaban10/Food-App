const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get a user's cart
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('items.foodItem');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create or update a user's cart
router.post('/', async (req, res) => {
    const { user, items, total } = req.body;
    try {
        let cart = await Cart.findOne({ user });
        if (cart) {
            cart.items = items;
            cart.total = total;
            cart = await cart.save();
        } else {
            cart = new Cart({ user, items, total });
            cart = await cart.save();
        }
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user's cart
router.delete('/:userId', async (req, res) => {
    try {
        const deletedCart = await Cart.findOneAndDelete({ user: req.params.userId });
        if (!deletedCart) return res.status(404).json({ message: 'Cart not found' });
        res.json({ message: 'Cart deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
