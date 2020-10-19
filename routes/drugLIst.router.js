const express = require('express')
const router = express.Router()

const {
  newDrugList,
  paidDrug
} = require('../controller/drugList.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware')

router.route('/druglist').post(isAuthUser, newDrugList)
router.route('/druglist/:id').put(isAuthUser, paidDrug)

module.exports = router