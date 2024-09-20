const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', '..', 'food-app/public', 'images');

        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Route for image upload
router.post('/', upload.single('imageUrl'), (req, res) => {
    console.log('heloooooo');
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Generate the URL for the uploaded image
    const imageUrl = `/images/${req.file.filename}`;

    // Send the URL as a response
    res.status(200).json({ imageUrl });
});

module.exports = router;
