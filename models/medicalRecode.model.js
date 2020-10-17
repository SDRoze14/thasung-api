const mongoose=require('mongoose');

const MedicalRecordSchema=new mongoose.Schema(
  {
    title: {
      type: String,
      enum: {
        values: ['นาย','นาง','นางสาว','ดช.','กญ.'],
        message: 'กรุณาเลือกคำนำหน้าชื่อ'
      }
    },
    first: {
      type: String,
      required: [true,'กรูณากรอกชื่อ'],
    },
    last: {
      type: String,
      required: [true,'กรุณากรอกนามสกุล']
    },
    citizen_id: {
      type: String,
      required: [true,'กรุณากรอกหมายเลขประจำตัวประชาชน'],
      maxlength: [14,'หมายเลขประจำตัวประชาชนไม่ถูกต้อง'],
      minlength: [13,'หมายเลขประจำตัวประชาชนไม่ถูกต้อง']
    },
    birth: {
      type: Date,
      required: [true,'กรุณาเลือกวัน เดือน ปีเกิด']
    },
    age: {
      type: String,
    },
    sex: {
      type: String,
      enum: {
        values: ['ชาย','หญิง'],
        message: 'กรุณาเลือกเพศสภาพ'
      }
    },
    blood: {
      type: String,
      enum: {
        values: ['A','B','AB','O','ไม่ทราบหมู่เลือด'],
        message: 'กรุณาเลือกกรุ๊ปเลือด'
      }
    },
    nationality: {
      type: String,
      required: [true,'กรุณากรอกสัญชาติ']
    },
    address: {
      type: String,
      required: [true,'กรุณากรอกที่อยู่']
    },
    moo: {
      type: String,
      required: [true,'กรุณากรอกหมู่ที่']
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
      required: [true,'กรุณากรอกตำบล']
    },
    distric: {
      type: String,
      required: [true,'กรุณากรอกอำเภอ']
    },
    province: {
      type: String,
      required: [true,'กรุณากรอกจังหวัด']
    },
    phone: {
      type: String,
      required: [true,'กรูรากรอกหมายเลขโทรศัพท์มือถือ']
    },
    disease: {
      type: String,
      default: '-'
    },
    drug_allergy: {
      type: String,
      default: '-'
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
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
)

// Show all medical record create by user
MedicalRecordSchema.virtual('SymptomPush', {
  ref: 'Symptom',
  localField: '_id',
  foreignField: 'medicalRecord_id',
  justOne: false
})

module.exports=mongoose.model('MedicalRecord',MedicalRecordSchema)