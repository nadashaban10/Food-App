const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Load environment variables from a .env file

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Correct secret key
});

// Setup Multer with Memory Storage for direct upload to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for image upload
router.post('/', upload.single('imageUrl'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Create a stream to upload the image to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'uploads' }, // Optionally, specify a folder in Cloudinary
            (error, result) => {
                if (error) {
                    console.error('Cloudinary Upload Error:', error);  // Log Cloudinary error
                    return res.status(500).json({ message: 'Cloudinary upload failed', error });
                }
                // Respond with the secure URL of the uploaded image
                return res.status(200).json({ imageUrl: result.secure_url });
            }
        );

        // Pass the file buffer to the upload stream
        uploadStream.end(req.file.buffer);

    } catch (error) {
        // General error handling
        console.error('Server Error:', error); // Log server-side error details
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
