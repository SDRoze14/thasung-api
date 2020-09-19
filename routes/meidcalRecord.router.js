const express = require('express')
const router = express.Router()

const {
  getAllMedicalRecord,
  getMedicalRecord,
  newMedicalRecord,
  updateMEdicalRecord,
  deleteMedicalRecord
} = require('../controller/medicalRecord.controller')

router.route('/medicalRecord').get(getAllMedicalRecord)
router.route('/medicalRecord/:id').get(getMedicalRecord)
router.route('/medicalRecord/new').post(newMedicalRecord)
router.route('/medicalRecord/:id').put(updateMEdicalRecord)
router.route('/medicalRecord/:id').put(updateMEdicalRecord).delete(deleteMedicalRecord)

module.exports = router