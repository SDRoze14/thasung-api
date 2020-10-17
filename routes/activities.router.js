const express = require('express')
const router = express.Router()

const { getAllActivities } = require('../controller/activities.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware');

router.route('/activities').get(isAuthUser, getAllActivities)

module.exports = router