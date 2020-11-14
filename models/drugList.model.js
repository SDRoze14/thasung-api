const mongoose = require('mongoose')

const DrugListSchema = new mongoose.Schema({
  supply_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'MedicalSupplies',
    require: true
  },
  name_drug: {
    type: String,
    ref: 'MedicalSupplies'
  },
  type4: Boolean,
  amount: {
    type: Number,
    required: [true, 'กรุณากรอกจำนวนยา']
  },
  price: {
    type: Number
  },
  status: {
    type: Boolean,
    default: false
  },
  order_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true
  },
  order_by_name: {
    type: String,
    ref: 'User',
    require: true
  },
  order_at: {
    type: Date,
    default: Date.now
  },
  paid_at: {
    type: Date,
    default: null
  },
  paid_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null
  },
  paid_by_name: {
    type: String,
    ref: 'User',
    default: null
  },
  symptom_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Symptom',
    require: true
  }
})

module.exports = mongoose.model('DrugList', DrugListSchema)