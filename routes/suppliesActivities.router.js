const express = require('express')
const router = express.Router()

const { getAllSuppliesActivities } = require('../controller/suppliesActivities.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware');

router.route('/suppliesActivities').get(isAuthUser, getAllSuppliesActivities)

module.exports = router