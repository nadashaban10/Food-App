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
        type: String,  
    },
    imageUrls: [
        {
            type: String,  
        }
    ],
    public_id: {
        type: String,  
      },
      public_ids: [
        {
          type: String,  
        }
      ],
});

module.exports = mongoose.model('Category', categorySchema);
