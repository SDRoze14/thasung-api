const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const catchAsyncError = require('./catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')

// check user authentication
exports.isAuthUser = catchAsyncError(async(req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) {
    return next(new ErrorHandler('Login first to access this resource.'), 401)
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decode.id)

  next()
});

// handler user role
exports.authorizaRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource.`), 403)
    }
    next();
  }
}