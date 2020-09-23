const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.erroe(err.message);
		res.status(500).send('server error');
	}
});
//@route POST api/auth
//@access
router.post(
	'/',
	[
		check('email', 'please inculde vail email').isEmail(),
		check('password', 'password is required ').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ erros: [{ msg: 'ivaild credentails ' }] });
			}
			//
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(400)
					.json({ erros: [{ msg: 'ivaild credentails ' }] });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				config.get('jwtSecert'),
				{ expiresIn: 3600000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('server error');
		}
		console.log(req.body);
	}
);
module.exports = router;
