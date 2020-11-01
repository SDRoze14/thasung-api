const DrugList=require('../models/drugList.model')
const Activities=require('../models/activities.model')
const MedicalSupplies=require('../models/medicalSupplies.model')

const ErrorHandler=require('../utils/errorHandler')
const catchAsyncErrors=require('../middlewares/catchAsyncErrors')
const APIFilters=require('../utils/apifilters')
const {response}=require('express')

exports.newDrugList=catchAsyncErrors(async (req,res,next) => {
  req.body.order_by=await req.user.id
  req.body.order_by_name=await `${req.user.title} ${req.user.first} ${req.user.last}`

  const drug_symptom=await DrugList.find({symptom_id: req.body.symptom_id})
  const supply_id=await DrugList.find({supply_id: req.body.supply_id,symptom_id: req.body.symptom_id})

  if(drug_symptom.length===0) {
    await DrugList.create(req.body)
      .then(async response => {
        await Activities.create({
          activities: 'add',
          from: 'drug-list',
          data: response,
          data_id: response.id,
          act_by: req.user.id
        }).then(() => {
          res.status(200).json({
            sucess: true,
            message: 'Add drug list successful',
            data: response,
          })
        })
      })
  } else {
    if(supply_id.length===0) {
      await DrugList.create(req.body)
        .then(async response => {
          await Activities.create({
            activities: 'add',
            from: 'drug-list',
            data: response,
            data_id: response.id,
            act_by: req.user.id
          }).then(() => {
            res.status(200).json({
              success: true,
              message: 'Add drug list successful',
              data: response,
            })
          })
        })
    } else {
      return next(new ErrorHandler('ยาตัวนี้ได้ถูกเพิ่มไปแล้ว',400))
    }
  }
})

exports.paidDrug=catchAsyncErrors(async (req,res,next) => {
  req.body.paid_at=await Date.now();
  req.body.paid_by=await req.user.id;
  req.body.paid_by_name=await `${req.user.title} ${req.user.first} ${req.user.last}`;
  req.body.status=await true

  const druglist=await DrugList.findById(req.params.id)

  if(!druglist) {
    return next(new ErrorHandler('Drug order not found',404))
  }else if (druglist.status === true) {
    return next(new ErrorHandler('Drug order is Paid',404))
  } else {
    await DrugList.findByIdAndUpdate(req.params.id,req.body,{
      new: true,
      runValidators: true,
      useFindAndModify: false
    })
      .then(async response => {
        let drug_id=await response.supply_id
        await MedicalSupplies.findById(drug_id)
          .then(async resp => {
            let total_amount=await resp.total-response.amount
            await MedicalSupplies.findByIdAndUpdate(drug_id,{total: total_amount},{
              new: true,
              runValidators: true,
              useFindAndModify: false
            })
              .then(async (sup_res) => {
                await Activities.create({
                  activities: 'update',
                  from: 'drug-list',
                  data: {
                    medical_name: response.name_drug,
                    type4: sup_res.type4,
                    order_at: response.order_at,
                    amount: response.amount,
                    status: response.status,
                    paid_at: response.paid_at,
                    paid_by: response.paid_by,
                    paid_by_name: response.paid_by_name,
                    supply_id: response.supply_id,
                    symptom_id: response.symptom_id,
                    order_by: response.order_by,
                    order_by_name: response.order_by_name,
                    order_at: response.order_at,
                    _id: response._id,
                  },
                  data_id: response.id,
                  act_by: req.user.id,
                }).then(() => {
                  res.status(200).json({
                    success: true,
                    message: 'Paid drug list successful',
                    data: response,
                  })
                })
              })
          })
      })
  }
})

exports.deleteDrugList = catchAsyncErrors(async(req, res, next) => {
  const druglist = await DrugList.findByIdAndDelete(req.params.id)

  if(!druglist) {
    return next(new ErrorHandler('drug list not found',404))
  }

  res.status(200).json({
    success: true,
    message: 'delete drug list successful'
  })
})