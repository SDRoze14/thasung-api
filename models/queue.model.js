const mongoose = require('mongoose')

const QueueSchema = new mongoose.Schema({
  queue: {
    type: Number
  },
  medicalRecode: {
    type: mongoose.Schema.ObjectId,
    ref: 'MedicalRecord'
  },
  approve: {
    type: String,
    enum: {
      values: ['wait', 'success', 'cancel']
    },
    default: 'wait'
  },
  symptom: {
    type: mongoose.Schema.ObjectId,
    ref: 'InitialSymptom'
  },
})

module.exports = mongoose.model('Queue', QueueSchema)