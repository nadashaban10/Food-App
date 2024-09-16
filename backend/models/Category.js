const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
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

module.exports = mongoose.model('Category', categorySchema);
