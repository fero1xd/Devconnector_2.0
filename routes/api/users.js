const router = require('express').Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    res.json({ user: req.user })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email should be valid').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength(6),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      // Get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })

      // Create User

      const user = await User.create({
        name,
        email,
        avatar,
        password,
      })

      // Send JWT
      const payload = {
        userId: user._id
      }

      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          expiresIn: '2d',
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .send('User already exists')
      }
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
