const express = require('express');
const router = express.Router();

// Import post and comment route files
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const authRoutes = require('./auth');

// Mount post and comment routes
router.use('/api/v1/posts', postRoutes);
router.use('/api/v1/comments', commentRoutes);
router.use('/api/v1/auth', authRoutes);

module.exports = router;
