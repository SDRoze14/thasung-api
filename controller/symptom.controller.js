const Symptom = require('../models/symptom.model')
const Activities = require('../models/activities.model')
const Queue = require('../models/queue.model')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFilters = require('../utils/apifilters')
const {errorMonitor}=require('nodemailer/lib/mailer')

let i = 0
let date = new Date().getDate()

exports.newSymptom = catchAsyncErrors(async(req, res, next) => {
  let date_now = new Date().getDate()
  if (date != date_now) {
    date = date_now
    i = 0
  }

  let q

  if (i > 9) {
    q = `${date}-0${i++}`
  } else if (i > 99) {
    q = `${date}-${i++}`
  } else {
    q = `${date}-00${i++}`
  }

  req.body.create_by = req.user.id
  req.body.name_create = `${req.user.title} ${req.user.first} ${req.user.last}`
  await Symptom.create(req.body)
  .then(async response => {
    await Queue.create({
      queue: q,
      medicalRecode: response.medicalRecord_id,
      symptom: response.id
    })
    await Activities.create({
      activities: 'add',
      from: 'initial-symptom',
      data: response,
      data_id: response.id,
      act_by: req.user.id
    }).then(() => {
      res.status(200).json({
        sucess: true,
        message: 'บันทึกข้อมูลอาการเบื้องต้นแล้ว',
        data: response,
      })
    })
  })
})

exports.getSymptom = catchAsyncErrors(async(req, res, next) => {
  const symptom = await Symptom.findById(req.params.id).populate({
    path: 'medicalRecord_id',
    select: 'title first last citizen_id birth age sex blood nationality disease drug_allergy address moo soi road tambon distric province phone'
  })
  .populate({
    path: 'drugPush',
    select: 'name_drug amount status order_by_name order_at paid_at paid_by_name'
  })

  if(!symptom||symptom.length===0) {
    return next(new ErrorHandler('Symptom not found',404));
  }

  res.status(200).json({
    success: true,
    data: symptom
  })
})

exports.updateSymptom = catchAsyncErrors(async(req, res, next) => {
  req.body.predicate_by = req.user.id
  req.body.predicate_at = new Date()
  req.body.name_predicate = `${req.user.title} ${req.user.first} ${req.user.last}`
  const symptom = await Symptom.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  if (!symptom) {
    return next(new ErrorHandler('Symptom not found', 404))
  } else {
    await Activities.create({
      activities: 'update',
      from: 'initial-symptom',
      data: symptom,
      data_id: symptom.id,
      act_by: req.user.id
    })

    res.status(200).json({
      sucess: true,
      message: 'บันทึกข้อมูลอาการเบื้องต้นแล้ว',
      data: symptom,
    })
  }
})