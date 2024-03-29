const mongoose = require('mongoose')

const QueueSchema = new mongoose.Schema({
  queue: {
    type: String
  },
  medicalRecode: {
    type: mongoose.Schema.ObjectId,
    ref: 'MedicalRecord'
  },
  approve: {
    type: String,
    enum: {
      values: ['wait', 'success', 'cancel', 'await_drug']
    },
    default: 'wait'
  },
  symptom: {
    type: mongoose.Schema.ObjectId,
    ref: 'InitialSymptom'
  },
})

module.exports = mongoose.model('Queue', QueueSchema)