const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all food items
router.get('/', async (req, res) => {
    try {
        const MenuItems = await MenuItem.find().populate('category');
        res.json(MenuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a food item by ID
router.get('/:id', async (req, res) => {
    try {
        const MenuItems = await MenuItem.findById(req.params.id).populate('category');
        if (!MenuItems) return res.status(404).json({ message: 'Menu item not found' });
        res.json(MenuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new food item
router.post('/', async (req, res) => {
    const MenuItems = new MenuItem(req.body);
    try {
        const newMenuItem = await MenuItems.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a food item
router.put('/:id', async (req, res) => {
    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a food item
router.delete('/:id', async (req, res) => {
    try {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
