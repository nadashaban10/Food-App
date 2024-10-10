const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Load environment 

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// Multer with Memory Storage to upload Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for single image upload
router.post('/', upload.single('imageUrl'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Create a stream to upload the image to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'uploads' }, //specify a folder in Cloudinary
            (error, result) => {
                if (error) {
                    console.error('Cloudinary Upload Error:', error);  // Log Cloudinary error
                    return res.status(500).json({ message: 'Cloudinary upload failed', error });
                }
                // URL of the uploaded image
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

// Route for multiple image uploads
router.post('/upload-multiple', upload.array('imageUrls', 5), async (req, res) => {
    try {
        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Upload each image to Cloudinary
        const imageUploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'uploads' }, //specify a folder in Cloudinary
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary Upload Error:', error);
                            reject(error);
                        } else {
                            resolve(result.secure_url); 
                        }
                    }
                );
                uploadStream.end(file.buffer); 
            });
        });

        
        const imageUrls = await Promise.all(imageUploadPromises);

        //the uploaded image URLs
        return res.status(200).json({
            message: 'Images uploaded successfully',
            imageUrls: imageUrls,
        });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
