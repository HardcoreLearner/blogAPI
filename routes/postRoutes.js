const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const { authenticateUser, authorizeAdmin, authorizePostOwner } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', authenticateUser, postController.updatePost);
router.delete('/:id', authenticateUser, authorizeAdmin, authorizePostOwner, postController.deletePost);

module.exports = router;
