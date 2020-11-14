const express = require('express')
const router = express.Router()

const {
  newPayment,
  getPayment,
  updatePay,
} = require('../controller/payment.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware')

router.route('/payment').post(isAuthUser, newPayment)
router.route('/payment/:id').get(isAuthUser, getPayment)
router.route('/payment/:id').patch(isAuthUser, updatePay)

module.exports = router