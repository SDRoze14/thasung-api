const MedicalRecord = require('../models/medicalRecode.model')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFilters = require('../utils/apifilters')

exports.getAllMedicalRecord = catchAsyncErrors(async(req, res, next) => {
  const apifilters = new APIFilters(MedicalRecord.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination()

  const medicalRecodes = await apifilters.query

  res.status(200).json({
    success: true,
    results: medicalRecodes.length,
    data: medicalRecodes
  })
})

exports.getMedicalRecord = catchAsyncErrors(async(req, res, next) => {
  const medicalRecode = await MedicalRecord.find({_id: req.params.id}).populate({
    path: 'record_by',
    select: 'first last'
  })

  if (!medicalRecode || medicalRecode.length === 0) {
    return next(new ErrorHandler('Medical Record no found', 404));
  }

  res.status(200).json({
    success: true,
    data: medicalRecode
  })
})

exports.newMedicalRecord = catchAsyncErrors(async(req, res, next) => {

  req.body.record_by = req.user.id
  const medicalRecode = await MedicalRecord.create(req.body)

  res.status(200).json({
    success: true,
    message: 'Medical Record created',
    data: medicalRecode
  })
})

exports.updateMedicalRecord = catchAsyncErrors(async(req, res, next) => {
  let medicalRecode = await MedicalRecord.findById(req.params.id)

  if (!medicalRecode) {
    return next(new ErrorHandler('Medical Record no found', 404))
  }

  req.body.update_at = Date.now()

  medicalRecode = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    message: 'Medical Record is updated',
    data: medicalRecode
  })
})

exports.deleteMedicalRecord = catchAsyncErrors(async(req, res, next) => {
  let medicalRecode = await MedicalRecord.findById(req.params.id)

  if(!medicalRecode) {
    return next(new ErrorHandler('Medical Record not found', 404))
  }

  medicalRecode = await MedicalRecord.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Medical Record is deleted'
  })
})