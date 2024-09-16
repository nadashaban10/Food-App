const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
  },
  imageUrls: [
    {
      type: String,
    },
  ],
  sizeOptions: {
    halfKilo: {
      type: Number,
      default: function () {
        return this.price / 2; //  half kilo price
      },
    },
    quarterKilo: {
      type: Number,
      default: function () {
        return this.price / 4; //  quarter kilo price
      },
    },
    thirdKilo: {
      type: Number,
      default: function () {
        return this.price / 3; //  1/3 kilo price
      },
    },
  },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
