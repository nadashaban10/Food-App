const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


require('dotenv').config();


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
  });

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny')); // Log requests
app.use(cors())

// Routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const foodItemRoutes = require('./routes/foodItemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/fooditems', foodItemRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/orders', orderRoutes);

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
