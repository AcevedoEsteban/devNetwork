const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/posts
// @desc create post
// @acess private
router.post(
  '/',
  [auth, check('text', 'text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // this retruns the array error message on the backend as seen on postman
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // get the x-auth-token user login id and uses the info to post a long side the new post text field
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route GET api/posts
// @desc GET all post
// @acess private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route GET api/posts:id
// @desc GET post by ID
// @acess private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
    if (!post) {
      return res.status(404).json({ msg: 'most not found' });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'post not found' });
    }
    res.status(500).send('server error');
  }
});

// @route DELETE api/posts/:id
// @desc GET all post
// @acess private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized ' });
    }
    // this await is the else statement
    await post.remove();
    res.json({ msg: ' post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'post not found' });
    }
    res.status(500).send('server error');
  }
});

// @route PUT api/posts/like/:id
// @desc Like a post
// @acess private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the post has alreeadt been like by the same user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'post has already been liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).status('server error');
  }
});
// @route PUT api/posts/like/:id
// @desc Like a post
// @acess private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the post has alreeadt been like by the same user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'post has not yey been liked' });
    }
    // get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).status('server error');
  }
});

// @route POST api/posts/comment/:id
// @desc comment on a post
// @acess private
router.post(
  '/comment/:id',
  [auth, check('text', 'text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // this retruns the array error message on the backend as seen on postman
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // get the x-auth-token user login id and uses the info to post a long side the new post text field
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      post.comments.unshift(newComment);
      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);
// @route DELETE api/posts/comment/:id/:comment_id
// @desc comment on a post
// @acess private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // get comment connected to the post
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'comment does not exsit' });
    }
    // check the comment from the user but its a user to that needs to become a string inorder to compare it to another string
    if (comment.user.toString() !== req.user.id) {
      // 401 err mean unathurized
      return res.status(401).json({ msg: 'user not authorized' });
    }
    // get remove index
    const removeIndex = post.comments

      .map((comments) => comments.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    //  DONT FORGET THIS CODE AT THE BOTTOM AWAIT POST.SAVE()
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
