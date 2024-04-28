const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const { authenticateUser, authorizeCommentOwner } = require('../middleware/authMiddleware');

router.post('/:postId/comments', authenticateUser, commentController.createComment);
router.get('/:postId/comments', commentController.getAllCommentsForPost);
router.get('/:postId/comments/:commentId', commentController.getCommentForPost);
router.put('/:postId/comments/:commentId', authenticateUser, commentController.updateComment);
router.delete('/:postId/comments/:commentId', authenticateUser, authorizeCommentOwner, commentController.deleteComment);

module.exports = router;
