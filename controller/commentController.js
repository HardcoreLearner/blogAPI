const Comment = require('../model/comment');

// Controller function to create a new comment for a post
exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;
    const author = req.user._id;

    const newComment = new Comment({ content, author });
    await newComment.save();

    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get all comments for a post
exports.getAllCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a specific comment for a post
exports.getCommentForPost = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const comment = await Comment.findOne({ _id: commentId, postId });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a comment for a post
exports.updateComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a comment for a post
exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully', comment: deletedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;
