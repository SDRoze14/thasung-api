const Payment = require('../models/payment.model')
const Symptom = require('../models/symptom.model')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.newPayment = catchAsyncErrors(async(req, res, next) => {

  const symptom = await Payment.findOne({symptom: req.body.symptom})

  if (symptom) {
    return next(new ErrorHandler('เกิดข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง'))
  } else {
    req.body.user = await req.user.id
    // req.body.symptom = symptom._id

    const payment = await Payment.create(req.body)

    res.status(202).json({
      success: true,
      message: 'Create new Payment successful',
      data: payment
    })
  }
})

exports.getPayment = catchAsyncErrors(async(req, res, next) => {

  const payment = await Payment.findById(req.params.id)

  if (!payment) {
    return next(new ErrorHandler('payment not found', 404))
  } else {
    res.status(200).json({
      success: true,
      data: payment
    })
  }
})

exports.updatePay = catchAsyncErrors(async(req, res, next) => {

  const payment = await Payment.findByIdAndUpdate(req.params.id, {status: true}, {
    new: true,
    runValidators: true,
    useFindAndModify:false
  })

  if (!payment) {
    return next(new ErrorHandler('payment not found', 404))
  } else {
    res.status(201).json({
      success: true,
      message: 'Payment successful',
      data: payment
    })
  }
})