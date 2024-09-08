const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,  // Simple description
    required: true
  },
  richDescription: {
    type: String,  
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,  
    default: 0     
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Reference to the Category model
    required: true
  },
  available: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,  // Single image URL
  },
  imageUrls: [
    {
      type: String,  // Array of multiple image URLs
    }
  ]
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
