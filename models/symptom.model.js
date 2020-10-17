const mongoose = require('mongoose')

const SymptomSchema = new mongoose.Schema({
  medicalRecord_id : {
    type: mongoose.Schema.ObjectId,
    ref: 'MedicalRecord',
    required: true
  },
  initial: {
    type: String,
    required: [true, 'กรูณากรอกข้อมูลอาการเบื้องต้น']
  },
  predicate: {
    type: String
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  create_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  initial_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  predicate_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null
  }
})

module.exports = mongoose.model('Symptom', SymptomSchema)