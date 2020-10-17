const express = require('express')
const router = express.Router()

const {
  newSymptom,
  getSymptom,
  updateSymptom,
} = require('../controller/symptom.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware')

router.route('/symptom').post(isAuthUser, newSymptom)
router.route('/symptom/:id').get(isAuthUser, getSymptom)
router.route('/symptom/:id').put(isAuthUser, updateSymptom)

module.exports = router