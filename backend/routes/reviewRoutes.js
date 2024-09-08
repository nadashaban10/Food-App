const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews for a food item
router.get('/food/:foodItemId', async (req, res) => {
    try {
        const reviews = await Review.find({ foodItem: req.params.foodItemId }).populate('user');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new review
router.post('/', async (req, res) => {
    const review = new Review(req.body);
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a review
router.put('/:id', async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a review
router.delete('/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
