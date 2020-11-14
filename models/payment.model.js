const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
  symptom: {
    type: mongoose.Schema.ObjectId,
    ref: 'Symptom'
  },
  total_price: {
    type: Number,
  },
  treatment_cost: {
    type: Number,
    required: [true, 'กรุณากรอกค่าการรักษา']
  },
  treatment_title: {
    type: String,
    required: [true, 'กรุณากรอกรายละเอียดการรักษา']
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  status: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Payment', PaymentSchema)
