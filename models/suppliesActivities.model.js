const mongoose = require('mongoose')

const SuppliesActivities = new mongoose.Schema({
  activities: {
    type: String,
    eunm: {
      values: ['add', 'update', 'delete', ]
    }
  },
  data: {
    type: Object,
    ref: 'MedicalSupplies',
    require: true
  },
  data_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'MedicalSupplies',
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

module.exports = mongoose.model('SuppliesActivities', SuppliesActivities)