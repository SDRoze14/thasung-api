const mongoose = require('mongoose')

const MedicalSupplies = new mongoose.Schema({
  medical_name: {
    type: String,
    required: [true, 'กรุณากรอกชื่อยาทางการแพทย์']
  },
  name: {
    type: String
  },
  amount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: [true, 'กรุณากรอกจำนวนยา']
  },
  unit: {
    type: String,
    enum: {
      values: ['เม็ด', 'แผง', 'กระปุก', 'ขวด', 'ซอง'],
      message: 'กรุณาดลือกหน่วยยา'
    }
  },
  date_add: {
    type: Date,
    required: [true, 'กรุณาเลือกวัน/เดือน/ปีเข้าคลัง']
  },
  from: {
    type: String
  },
  price_for_unit: {
    type: Number
  },
  price_total: {
    type: Number
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