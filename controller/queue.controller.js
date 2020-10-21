const Queue = require('../models/queue.model')

const catchAsyncErrors=require('../middlewares/catchAsyncErrors')
const ErrorHandler=require('../utils/errorHandler')

exports.getAllQueue = catchAsyncErrors(async(req, res, next) => {
  const queue = await Queue.find().populate({
    path: 'MedicalRecord',
    select: 'first last'
  })

  res.status(200).json({
    success: true,
    results: queue.length,
    data: queue
  })
})

exports.getQueue  = catchAsyncErrors(async(req, res, next) => {
  const queue = await Queue.findById(req.params.id)

  if (!queue || queue.length === 0) {
    return next(new ErrorHandler('Queue not found', 404))
  }

  res.status(200).json({
    success: true,
    data: queue
  })
})

exports.updateQueue = catchAsyncErrors(async(req, res, next) => {
  const queue = await Queue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  if(!queue) {
    return next(new ErrorHandler('Queue not found', 404))
  }

  res.status(200).json({
    success: true,
    data: queue
  })
})