const express = require('express')
const router = express.Router()

const {
  getAllMedicalRecord,
  getMedicalRecord,
  newMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord
} = require('../controller/medicalRecord.controller')


const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware');

router.route('/medicalRecord').get(isAuthUser, getAllMedicalRecord)
router.route('/medicalRecord/:id').get(isAuthUser, getMedicalRecord)
router.route('/medicalRecord/new').post(isAuthUser, authorizaRoles('super', 'doctor'), newMedicalRecord)
router.route('/medicalRecord/:id').put(isAuthUser,  updateMedicalRecord)
router.route('/medicalRecord/:id').put(isAuthUser, authorizaRoles('super', 'doctor'), updateMedicalRecord).delete(deleteMedicalRecord)

module.exports = router