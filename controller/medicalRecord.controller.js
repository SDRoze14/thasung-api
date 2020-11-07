const MedicalRecord=require('../models/medicalRecode.model')
const Activities=require('../models/activities.model')

const ErrorHandler=require('../utils/errorHandler')
const catchAsyncErrors=require('../middlewares/catchAsyncErrors')
const APIFilters=require('../utils/apifilters')

exports.getAllMedicalRecord=catchAsyncErrors(async (req,res,next) => {
  const apifilters=new APIFilters(MedicalRecord.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination()

  const medicalRecodes=await apifilters.query

  res.status(200).json({
    success: true,
    results: medicalRecodes.length,
    data: medicalRecodes
  })
})

exports.getMedicalRecord=catchAsyncErrors(async (req,res,next) => {
  const medicalRecode=await MedicalRecord.findById(req.params.id).populate({
    path: 'record_by',
    select: 'first last'
  }).populate({
    path: 'SymptomPush',
    select: 'initial name_create create_at predicate name_predicate predicate_at'
  })

  if(!medicalRecode||medicalRecode.length===0) {
    return next(new ErrorHandler('Medical Record not found',404));
  }

  res.status(200).json({
    success: true,
    data: medicalRecode
  })
})

exports.newMedicalRecord=catchAsyncErrors(async (req,res,next) => {

  const medicalracord=await MedicalRecord.findOne({citizen_id: req.body.citizen_id})

  if(medicalracord) {
    return next(new ErrorHandler('หมายเลขบัตรประชาชนนี้มีในระบบแล้ว',403))
  } else {
    req.body.record_by=req.user.id
    await MedicalRecord.create(req.body)
      .then(async response => {
        await Activities.create({
          activities: 'add',
          from: 'medical-record',
          data: response,
          data_id: response.id,
          act_by: req.user.id
        }).then(() => {
          res.status(200).json({
            sucess: true,
            message: 'Medical Record created',
            data: response,
          })
        })
      })
  }
})

exports.updateMedicalRecord=catchAsyncErrors(async (req,res,next) => {
  let medicalRecode=await MedicalRecord.findById(req.params.id)

  if(!medicalRecode) {
    return next(new ErrorHandler('Medical Record not found',404))
  }

  req.body.update_at=Date.now()

  await MedicalRecord.findByIdAndUpdate(req.params.id,req.body,{
    new: true,
    runValidators: true,
    useFindAndModify: false
  }).then(async response => {
    await Activities.create({
      activities: 'update',
      from: 'medical-record',
      data: response,
      data_id: response.id,
      act_by: req.user.id
    }).then(() => {
      res.status(200).json({
        sucess: true,
        message: 'Medical Record created',
        data: response,
      })
    })
  })
})

exports.deleteMedicalRecord=catchAsyncErrors(async (req,res,next) => {
  let medicalRecode=await MedicalRecord.findById(req.params.id)

  if(!medicalRecode) {
    return next(new ErrorHandler('Medical Record not found',404))
  }

  await MedicalRecord.findByIdAndDelete(req.params.id)
    .then(async response => {
      await Activities.create({
        activities: 'delete',
        from: 'medical-record',
        data: response,
        data_id: response.id,
        act_by: req.user.id
      }).then(() => {
        res.status(200).json({
          sucess: true,
          message: 'Medical Record created',
          data: response,
        })
      })
    })
})