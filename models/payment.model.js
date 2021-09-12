const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
  symptom: {
    type: mongoose.Schema.ObjectId,
    ref: 'Symptom'
  },
  total_price: {
    type: Number,
  },
  treatment: {
    type: Array,
    default: []
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
