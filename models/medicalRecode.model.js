const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: {
      values: ['Master', 'Mr', 'Mrs', 'Miss'],
      message: 'กรุณาเลือกคำนำหน้าชื่อ'
    }
  },
  first: {
    type: String,
    required: [true, 'กรูณากรอกชื่อ'],
  },
  last: {
    type: String,
    required: [true, 'กรุณากรอกนามสกุล']
  },
  citizen_id: {
    type: String,
    required: [true, 'กรุณากรอกหมายเลขประจำตัวประชาชน'],
    maxlength: [14, 'หมายเลขประจำตัวประชาชนไม่ถูกต้อง'],
    minlength: [13, 'หมายเลขประจำตัวประชาชนไม่ถูกต้อง']
  },
  birth: {
    type: Date,
    required: [true, 'กรุณาเลือกวัน เดือน ปีเกิด']
  },
  age: {
    type: String,
  },
  status: {
    type: String,
    enum: {
      values: ['single', 'married', 'divorced'],
      message: 'กรุณาเลือกสถานภาพสมรส'
    }
  },
  blood: {
    type: String,
    enum: {
      values: ['A', 'B', 'AB', 'O'],
      message: 'กรุณาเลือกกรุ๊ปเลือด'
    }
  },
  nationality: {
    type: String,
    required: [true, 'กรุณากรอกสัญชาติ']
  },
  address: {
    type: String,
    required: [true, 'กรุณากรอกที่อยู่']
  },
  moo: {
    type: String,
    required: [true, 'กรุณากรอกหมู่ที่']
  },
  soi: {
    type: String,
    default: '-'
  },
  road: {
    type: String,
    default: '-'
  },
  tambon: {
    type: String,
    required: [true, 'กรุณากรอกตำบล']
  },
  distric: {
    type: String,
    required: [true, 'กรุณากรอกอำเภอ']
  },
  province: {
    type: String,
    required: [true, 'กรุณากรอกจังหวัด']
  },
  zip: {
    type: String,
    required: [true, 'กรุณากรอกรหัสไปรษณีย์']
  },
  phone: {
    type: String,
    required: [true, 'กรูรากรอกหมายเลขโทรศัพท์มือถือ']
  },
  disease: {
    type: String,
    default: '-'
  },
  drug_allergy: {
    type: String,
    default: '-'
  },
  symptom: {
    type: String,
    required: [true, 'กรุณากรอกอาการเบื้องต้น']
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  },
  record_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema)