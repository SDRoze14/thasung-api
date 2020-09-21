const express = require('express')
const router = express.Router()

const {
  getUserProfile,
  updatePassword,
  updateUser,
  deleteUser
} = require('../controller/user.controller')

const { isAuthUser } = require('../middlewares/auth.middleware')

router.route('/me').get(isAuthUser, getUserProfile);
router.route('/password/change').put(isAuthUser, updatePassword);
router.route('/me/update').put(isAuthUser, updateUser);
router.route('/me/delete').delete(isAuthUser, deleteUser);

module.exports = router