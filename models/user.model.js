const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const UserSchema=new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true,'กรุณากรอกคำนำหน้าชื่อ']
    },
    first: {
      type: String,
      required: [true,'กรุณากรอกชื่อ']
    },
    last: {
      type: String,
      required: [true,'กรุณากรอกนามสกุล']
    },
    email: {
      type: String,
      required: [true,'กรุณากรอกอีเมล'],
      unique: true,
      validate: [validator.isEmail,'อีเมลไม่ถูกต้อง']
    },
    password: {
      type: String,
      required: [true,''],
      minlength: [8,'รหัสผ่านสั้นเกินไปต้องอย่างน้อย 8 ตัวอักษร'],
      select: false
    },
    role: {
      type: String,
      enum: {
        values: ['admin','doctor','nurse', 'assistant'],
        message: 'กรุณาเลือกสิทธิ์ในการเข้าถึงข้อมูล'
      },
      default: 'nurse'
    },
    doctor_id: {
      type: String,
      required: [true,'กรุณากรอกหมายเลขประจำตัวแพทย์']
    },
    phone: {
      type: String,
      required: [true,'กรุณากรอกหมายเลขโทรศัพท์มือถือ']
    },
    create_at: {
      type: Date,
      default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

// Encryp password
UserSchema.pre('save',async function(next) {

  if(!this.isModified('password')) {
    next();
  }

  this.password=await bcrypt.hash(this.password,10)
});


// Return JWT
UserSchema.methods.getJwtToken=function() {
  return jwt.sign({id: this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_ITME
  })
}

// compare password
UserSchema.methods.comparePassword=async function(enterPassword) {
  return await bcrypt.compare(enterPassword,this.password)
}

// Reset pssaword
UserSchema.methods.getResetPasswordToken=async function() {
  const resetToken=crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken=crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire=Date.now()+30*60*1000;

  return resetToken;
}

// Show all medical record create by user
UserSchema.virtual('medicalRecordsPush', {
  ref: 'MedicalRecord',
  localField: '_id',
  foreignField: 'record_by',
  justOne: false
})

UserSchema.virtual('ActivitiesPush', {
  ref: 'Activities',
  localField: '_id',
  foreignField: 'act_by',
  justOne: false
})

module.exports=mongoose.model('User', UserSchema)