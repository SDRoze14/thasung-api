const Activities = require('../models/activities.model')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFilters = require('../utils/apifilters')

exports.getAllActivities = catchAsyncErrors(async(req, res, next) => {
  const apifilters = new APIFilters(Activities.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination()

  const activities = await apifilters.query

  res.status(200).json({
    success: true,
    results: activities.length,
    data: activities
  })
})