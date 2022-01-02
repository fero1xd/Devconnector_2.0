const router = require('express').Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const uuid = require('uuid').v4;

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');

    try {
      const post = await Post.create({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: user._id
      });

      res.json(post);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all post
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   GET api/posts
// @desc    Get post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).sort({ date: -1 });
    if (!post) {
      return res.status(400).send('Post not found');
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).send('Post not found');

    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts
// @desc    Delete post by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).sort({ date: -1 });

    if (!post) {
      return res.status(400).send('Post not found');
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(400).send('Comment does not exist');
    }

    await post.remove();

    res.send('Post removed');
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).send('Post not found');
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send('Post not found');
    }

    // Check if post already liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).send('Post already Liked');
    }

    // Like the post
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).send('Post not found');
    }
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send('Post not found');
    }
    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).send('Post has not yet been liked');
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).send('Post not found');
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      if (!post || !user) {
        return res.status(400).send('Post or user not found');
      }

      const newComment = {
        _id: uuid(),
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(400).send('Post not found');

    }
    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment._id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(400).send('Comment does not exist');
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send('User not authorized');
    }

    post.comments = post.comments.filter(
      (comment) => comment._id !== req.params.comment_id
    );

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
