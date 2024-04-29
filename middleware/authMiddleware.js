const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Comment = require('../model/comment');
const config = require('../config/jwt');

const authenticateUser = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization.split(' ')[1];

  // Verify the token
  jwt.verify(token, config.secret, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    } else {
      // Fetch the user associated with the token
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
        // Attach the user object to the request for further processing
        req.user = user;
        next();
      }
    }
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  } else {
    next();
  }
};

const authorizePostOwner = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id;

  // Fetch the post by ID
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Check if the authenticated user is the owner of the post
  if (post.author.toString() !== userId) {
    return res.status(403).json({ message: 'Forbidden' });
  } else {
    next();
  }
};

const authorizeCommentOwner = async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;

  // Fetch the comment by ID
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  // Check if the authenticated user is the owner of the comment
  if (comment.author.toString() !== userId) {
    return res.status(403).json({ message: 'Forbidden' });
  } else {
    next();
  }
};

module.exports = { authenticateUser, authorizeAdmin, authorizePostOwner, authorizeCommentOwner };
