const SuppliesActivities = require('../models/suppliesActivities.model')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFilters = require('../utils/apifilters')

exports.getAllSuppliesActivities = catchAsyncErrors(async(req, res, next) => {
  const apifilters = new APIFilters(SuppliesActivities.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .searchByQuery()
    .pagination()

  const suppliesActivities = await apifilters.query

  res.status(200).json({
    success: true,
    results: suppliesActivities.length,
    data: suppliesActivities
  })
})