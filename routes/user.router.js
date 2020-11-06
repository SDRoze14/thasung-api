const express = require('express')
const router = express.Router()

const {
  getUserProfile,
  updatePassword,
  updateUser,
  deleteUser,
  getUser,
  deleteUserAdmin,
  getOneUser
} = require('../controller/user.controller')

const { isAuthUser, authorizaRoles } = require('../middlewares/auth.middleware')

router.use(isAuthUser)

router.route('/me').get(getUserProfile);
router.route('/password/change').put(updatePassword);
router.route('/me/update').put(updateUser);
router.route('/me/delete').delete(deleteUser);

// super and doctor
router.route('/users').get(authorizaRoles('admin', 'doctor'), getUser);
router.route('/users/:id').get(authorizaRoles('admin'), getOneUser);
router.route('/users/:id').delete(authorizaRoles('admin', 'doctor'), deleteUserAdmin);

module.exports = router