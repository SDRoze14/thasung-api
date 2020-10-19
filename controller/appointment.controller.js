const Appointment = require('../models/appointment.model')
const Activities = require('../models/activities.model')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFilters = require('../utils/apifilters')
const {response}=require('express')

exports.getAllAppointment = catchAsyncErrors(async(req, res, next) => {
  const appointment = await Appointment.find()

  res.status(200).json({
    success: true,
    results: appointment.length,
    data: appointment
  })
})

exports.newAppointment = catchAsyncErrors(async(req, res, next) => {
  req.body.add_by = req.user.id

  await Appointment.create(req.body)
    .then(async response => {
      await Activities.create({
        activities: 'add',
        from: 'appointment',
        data: response,
        data_id: response.id,
        act_by: req.user.id
      }).then (() => {
        res.status(200).json({
          success: true,
          message: 'Add new appointment successful',
          data: response
        })
      })
    })
})

exports.updateAppointment = catchAsyncErrors(async(req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)

  if(!appointment) {
    return next(new ErrorHandler('Appointment not found'), 404)
  } else {
    await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }).then(async response => {
      await Activities.create({
        activities: 'update',
        from: 'appointment',
        data: response,
        data_id: response.id,
        act_by: req.user.id
      }).then (() => {
        res.status(200).json({
          success: true,
          message: 'Update appointment successful',
          data: response
        })
      })
    })
  }
})

exports.deleteAppointment = catchAsyncErrors(async(req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)

  if (!appointment) {
    return next(new ErrorHandler('Appointment not found'), 404)
  } else {
    await Appointment.findByIdAndDelete(req.params.id)
      .then(async response => {
        await Activities.create({
          activities: 'delete',
          from: 'appointment',
          data: response,
          data_id: response.id,
          act_by: req.user.id
        }).then (() => {
          res.status(200).json({
            success: true,
            message: 'Delete appointment successful',
            data: response
          })
        })
      })
  }
})