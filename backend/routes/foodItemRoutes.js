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

// Get all food items with optional search by name and description
router.get('/search', async (req, res) => {
    try {

        const { name, description } = req.query;

        let query = {};

        if (name) {
            query.name = new RegExp(name, 'i');
        }

        if (description) {
            query.description = new RegExp(description, 'i');
        }


        const MenuItems = await MenuItem.find(query).populate('category');
        res.json(MenuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get food items by category ID
router.get('/category/:categoryId', async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const menuItems = await MenuItem.find({ category: categoryId }).populate('category');

        if (menuItems.length === 0) {
            return res.status(404).json({ message: 'No menu items found for this category' });
        }

        res.json(menuItems);
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
    try {
        // Check if `public_ids` and `imageUrls` are present and valid
        console.log("Request Body: ", req.body);
        const public_ids = req.body.public_ids ? (Array.isArray(req.body.public_ids) ? req.body.public_ids : JSON.parse(req.body.public_ids)) : [];
        const imageUrls = req.body.imageUrls ? (Array.isArray(req.body.imageUrls) ? req.body.imageUrls : JSON.parse(req.body.imageUrls)) : [];
        
        
        // Create a new object with parsed data
        const newMenuItemData = {
            ...req.body,  // Copy other fields from the request body
            public_ids: public_ids,
            imageUrls: imageUrls,  // Replace the string with the parsed array
        };

        
        // Create a new MenuItem instance using the parsed data
        const newMenuItem = new MenuItem(newMenuItemData);
        
        // Save the new menu item to the database
        const savedMenuItem = await newMenuItem.save();
        
        // Return the newly created menu item
        res.status(201).json(savedMenuItem);
    } catch (error) {
        // Handle any errors during the save process
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
