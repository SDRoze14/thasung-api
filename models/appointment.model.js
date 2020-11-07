const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  medical_name: {
    type: String,
    required: [true, 'กรุณากรอกชื่องาน']
  },
  description: String,
  start: {
    type: Date,
    required: [true, 'กรุณาเลือกวันที่เริ่ม']
  },
  end: {
    type: Date,
    required: [true, 'กรุณาเลือกวันที่สิ้นสุด']
  },
  color: {
    type: String,
    default: 'blue'
  },
  add_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Appointment', AppointmentSchema)