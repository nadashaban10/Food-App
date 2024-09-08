const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// Get a user's wishlist
router.get('/:userId', async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate('items.foodItem');
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create or update a user's wishlist
router.post('/', async (req, res) => {
    const { user, items } = req.body;
    try {
        let wishlist = await Wishlist.findOne({ user });
        if (wishlist) {
            wishlist.items = items;
            wishlist = await wishlist.save();
        } else {
            wishlist = new Wishlist({ user, items });
            wishlist = await wishlist.save();
        }
        res.status(201).json(wishlist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user's wishlist
router.delete('/:userId', async (req, res) => {
    try {
        const deletedWishlist = await Wishlist.findOneAndDelete({ user: req.params.userId });
        if (!deletedWishlist) return res.status(404).json({ message: 'Wishlist not found' });
        res.json({ message: 'Wishlist deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
