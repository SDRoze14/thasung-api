const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
  medical_record: {
    type: mongoose.Schema.ObjectId,
    ref: 'MedicalRecord'
  },
  total_price: {
    type: Float32Array,
  },
  treatment_cost: {
    type: Float32Array,
    required: [true, 'กรุณากรอกค่าการรักษา']
  },
  treatment_title: {
    type: String,
    required: [true, 'กรุณากรอกรายละเอียดการรักษา']
  }
})