const User = require('../models/user.model')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler=require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')

// Create new User
exports.newUser = catchAsyncErrors(async(req, res, next) => {
  const {
    title,
    first,
    last,
    email,
    password,
    role,
    doctor_id,
    phone
  } = req.body;


  const user = await User.create({
    title,
    first,
    last,
    email,
    password,
    role,
    doctor_id,
    phone
  })

  sendToken(user, 200, res)
})

// Login
exports.login = catchAsyncErrors(async(req, res, next) => {
  const { email, password} = req.body;

  // Check
  if(!email || !password) {
    return next(new ErrorHandler('กรุณากรอกอีเมล และรหัสผ่าน'), 400);
  }

  const user = await User.findOne({email}).select('+password')

  if(!user) {
    return next(new ErrorHandler('Invalid Email or Password'), 401);
  }

  // check password
  const isPasswodMatched = await user.comparePassword(password);

  if(!isPasswodMatched) {
    return next(new ErrorHandler('Invalid Email or Password'), 401);
  }

  sendToken(user, 200, res)
});

// forgot password
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
  const user = await User.findOne({email: req.body.email});

  if(!user) {
    return next(new ErrorHandler('Email not found'), 404)
  }

  // Get reset password
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false})

  // Create reset passwor durl
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

  const message = `Your password reset link is as follow:\n\n${resetUrl}\n\n if you have not request this, then please ingore that.`


  try {
    await sendEmail({
      email: user.email,
      suject: 'Password Recovery',
      message
    });

    res.status(200).json({
      success: true,
      message: `Email sent successfully to : ${user.email}.`
    })
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false})

    return next(new ErrorHandler('Email is not sent.'), 500)
  }

})

// Reset Password
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {
  // Hash url token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()}
  });

  if (!user) {
    return next(new ErrorHandler('Password Reset token in invalid. orbeen expired'), 400)
  }

  // Set new password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  sendToken(user, 200 ,res)
})

// Logout
exports.logout = catchAsyncErrors(async(req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  })
})