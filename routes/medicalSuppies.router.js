const express = require('express')
const router = express.Router()

const {
  getAllMedicalSupplies,
  getMedicalSupplies,
  newMedicalSupply,
  updateMedicalSupply,
  deleteMedicalSupply
} = require('../controller/medicalSupplies.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware')

router.route('/medicalSupplies').get(isAuthUser, getAllMedicalSupplies)
router.route('/medicalSupplies/:id').get(isAuthUser, getMedicalSupplies)
router.route('/medicalSupplies/new').post(isAuthUser, authorizaRoles('super', 'doctor'), newMedicalSupply)
router.route('/medicalSupplies/:id').put(isAuthUser, updateMedicalSupply)
router.route('/medicalSupplies/:id').put(isAuthUser, authorizaRoles('super', 'doctor'), updateMedicalSupply).delete(deleteMedicalSupply)

module.exports = router