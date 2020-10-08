const MedicalSupplies = require('../models/medicalSupplies.model')
const SuppliesActivities = require('../models/suppliesActivities.model')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFilters = require('../utils/apifilters')


// Get All Medical Supplies
exports.getAllMedicalSupplies = catchAsyncErrors(async(req, res, next) => {
  const apifilters = new APIFilters(MedicalSupplies.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination()

  const medicalSupplies = await apifilters.query

  res.status(200).json({
    sucess: true,
    results: medicalSupplies.length,
    data: medicalSupplies
  })
})

exports.newMedicalSupply = catchAsyncErrors(async(req, res, next) => {
  await MedicalSupplies.create(req.body)
    .then(async response => {
      await SuppliesActivities.create({
        activities: 'add  ',
        data: response,
        data_id: response.id,
        act_by: req.user.id
      }).then(() => {
        res.status(200).json({
          sucess: true,
          message: 'Medical Supply created',
          data: response,
        })
      })
    })
})

exports.getMedicalSupplies = catchAsyncErrors(async(req, res, next) => {
  const medicalSupplies = await MedicalSupplies.find({_id: req.params.id})

  if(!medicalSupplies || medicalSupplies.length === 0) {
    return next(new ErrorHandler('Midical Supply not found', 404))
  }

  res.status(200).json({
    success: true,
    data: medicalSupplies
  })
})

exports.updateMedicalSupply = catchAsyncErrors(async(req, res, next) => {
  let medicalSupplies = await MedicalSupplies.findById(req.params.id)

  if(!medicalSupplies) {
    return next(new ErrorHandler('Medical Supply not found', 404))
  }

  req.body.update_at = Date.now()

  await MedicalSupplies.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  }).then(async response => {
    await SuppliesActivities.create({
      activities: 'update',
      data: response,
      data_id: response.id,
      act_by: req.user.id
    }).then(() => {
      res.status(200).json({
        sucess: true,
        message: 'Medical Supply is updated',
        data: response
      })
    })
  })
})

exports.deleteMedicalSupply = catchAsyncErrors(async(req, res, next) => {
  let medicalSupplies = await MedicalSupplies.findById(req.params.id)

  if (!medicalSupplies) {
    return next(new ErrorHandler('Mediacal Supply not found', 404))
  } else {
    await MedicalSupplies.findByIdAndDelete(req.params.id)
      .then(async response => {
        await SuppliesActivities.create({
          activities: 'delete',
          data: response,
          data_id: response.id,
          act_by: req.user.id
        }).then(() => {
          res.status(200).json({
            sucess: true,
            message: 'Medical Supply is deleted'
          })
        })
      })
  }
})

