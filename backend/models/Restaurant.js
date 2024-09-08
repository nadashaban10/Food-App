const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {
        type: String, // URL or path to the logo image
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    openingHours: {
        type: String, // e.g., "Mon-Fri 9am-9pm"
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    socialMediaLinks: {
        facebook: {
            type: String,
            required: false,
        },
        instagram: {
            type: String,
            required: false,
        },
        twitter: {
            type: String,
            required: false,
        },
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
