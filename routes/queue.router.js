const express = require('express')
const router = express.Router()

const {
  getAllQueue,
  getQueue,
  updateQueue,
} = require('../controller/queue.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware')

router.route('/queue').get(isAuthUser, getAllQueue)
router.route('/queue/:id').get(isAuthUser, getQueue)
router.route('/queue/:id').put(isAuthUser, updateQueue)

module.exports = router