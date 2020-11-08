const mongoose = require('mongoose')

const SymptomSchema = new mongoose.Schema(
  {
    medicalRecord_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'MedicalRecord',
      required: true
    },
    initial: {
      type: String,
      required: [true,'กรูณากรอกข้อมูลอาการเบื้องต้น']
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
    name_create: {
      type: String,
      ref: 'User'
    },
    doctor_id: {
      type: String,
      ref: 'User'
    },
    initial_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    predicate_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: null
    },
    predicate_at: {
      type: Date,
      default: null
    },
    name_predicate: {
      type: String,
      ref: 'User',
      default: null
    },
    certificatr: {
      type: Boolean,
      default: false
    },
    appointment: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

SymptomSchema.virtual('drugPush', {
  ref: 'DrugList',
  localField: '_id',
  foreignField: 'symptom_id',
  justOne: false
})

module.exports = mongoose.model('Symptom',SymptomSchema)