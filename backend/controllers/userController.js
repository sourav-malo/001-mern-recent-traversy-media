const asyncHandler = require('express-async-handler')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcryptjs')

// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all the fields') 
  }

  // Check if user exists
  const userExists = await User.findOne({ email })
  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash Password
  const salt = await bycrypt.genSalt(10)
  const hashedPassword = await bycrypt.hash(password, salt)

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword 
  })

  if(user) {
    res.status(201)
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Login User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if(user && (await bycrypt.compare(password, user.password))) {
    res.status(201)
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    res.json({ message: 'Invalid credentials' })
  }
})

// @desc    Get User Details
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200);
  res.json({ 
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  })
})

// Generate JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = { registerUser, loginUser, getMe }