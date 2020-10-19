const express = require('express')
const router = express.Router()

const {
  getAllAppointment,
  newAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controller/appointment.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware')

router.route('/appointment').get(isAuthUser, getAllAppointment)
router.route('/appointment').post(isAuthUser, newAppointment)
router.route('/appointment/:id').put(isAuthUser, updateAppointment)
router.route('/appointment/:id').put(isAuthUser, updateAppointment).delete(deleteAppointment)

module.exports = router