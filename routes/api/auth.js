const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route   POST api/auth
// @desc    Login and Get Token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Email should be valid').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .send('Invalid credentials');
      }

      if (!(await user.correctPassword(password, user.password))) {
        return res
          .status(400)
          .send('Invalid credentials');
      }

      // Send JWT
      const payload = {
        userId: user._id
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          expiresIn: '2d',
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
