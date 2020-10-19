const mongoose = require('mongoose')

const ActivitiesSchema = new mongoose.Schema({
  activities: {
    type: String,
    eunm: {
      values: ['add', 'update', 'delete' ]
    }
  },
  from: {
    type: String
  },
  data: {
    type: Object,
    require: true
  },
  data_id: {
    type: mongoose.Schema.ObjectId,
    require: true
  },
  act_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Activities', ActivitiesSchema)