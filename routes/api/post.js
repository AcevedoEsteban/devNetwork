const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
//@route POST api/posts
//@desc create post
//@acess private
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


//@route GET api/posts
//@desc GET all post
//@acess private

module.exports = router;
