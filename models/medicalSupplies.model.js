const mongoose = require('mongoose')

const MedicalSupplies = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '']
  },
  amount: {
    type: Number,
    required: [true, '']
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  },
  expire: Date,
})

module.exports = mongoose.model('MedicalSupplies', MedicalSupplies)