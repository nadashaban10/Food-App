const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new category
// router.post('/', async (req, res) => {
//     const category = new Category(req.body);
//     try {
//         const newCategory = await category.save();
//         res.status(201).json(newCategory);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// Create a new category
router.post('/', async (req, res) => {
    try {
        
        console.log("Request Body: ", req.body);

        
        const public_ids = req.body.public_ids ? 
            (Array.isArray(req.body.public_ids) ? req.body.public_ids : JSON.parse(req.body.public_ids)) : [];

        
        const imageUrls = req.body.imageUrls ? 
            (Array.isArray(req.body.imageUrls) ? req.body.imageUrls : JSON.parse(req.body.imageUrls)) : [];

        
        console.log("Parsed public_ids: ", public_ids);
        console.log("Parsed imageUrls: ", imageUrls);

        // Create a new category object with parsed data
        const newCategoryData = {
            ...req.body,
            public_ids,  
            imageUrls,   
        };

        
        const category = new Category(newCategoryData);

        
        const newCategory = await category.save();

        
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error: ", error);
        res.status(400).json({ message: error.message });
    }
});


// Update a category
router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
