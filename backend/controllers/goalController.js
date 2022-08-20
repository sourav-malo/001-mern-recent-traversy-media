const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalSchema')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }).sort({ updatedAt: 'desc' })

  res.status(200).json(goals)
})

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })
  res.status(200).json(goal)
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  // Check if goal exists
  const goal = await Goal.findById(req.params.id);
  if(!goal) {
    res.status(404)
    throw new Error('Goal not found')
  }

  // Check if user is authorized
  console.log(typeof req.user.id, typeof goal.user)
  if(req.user.id !== goal.user.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(goal, req.body, { new: true });
  res.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  // Check if goal exists
  if(!goal) {
    res.status(404)
    throw new Error('Goal not found')
  }

  // Check if user is authenticated
  if(req.user.id !== goal.user.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id })
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }                            