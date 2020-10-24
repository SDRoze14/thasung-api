const express = require('express')
const router = express.Router()

const {
  newUser,
  login,
  forgotPassword,
  resetPassword,
  logout
} = require('../controller/auth.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware');

router.route('/newUser').post(isAuthUser, authorizaRoles('super'), newUser)
router.route('/login').post(login)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(isAuthUser, logout)

module.exports = router;