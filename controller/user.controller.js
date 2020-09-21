const User = require('../models/user.model')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwtToken')

// get me
exports.getUserProfile = catchAsyncErrors(async(req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    data: user
  })
})

// update current user password
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.currentPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Old Password is incorrect,'),401)
  }

  user.password = req.body.newPassword
  await user.save()

  sendToken(user, 200, res)
})

// update current user
exports.updateUser = catchAsyncErrors(async(req, res, next) => {
  const newUserData = {
    title: req.body.title,
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    doctor_id: req.body.doctor_id,
    phone: req.body.phone
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    data: user
  })
})

// Delete current user **not use but set for use somthing
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id)

  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Your account has been deleted'
  })
})