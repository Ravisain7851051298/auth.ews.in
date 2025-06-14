const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/v1/register', userController.createUser);
router.post('/v1/login', userController.login);
router.get('/v1/profile', authMiddleware.authUser, userController.getUserProfile);
router.post('/v1/forgot-password', userController.forgotPassword);
router.post('/v1/reset-password',authMiddleware.authUser, userController.resetPassword);
router.post('/v1/logout', authMiddleware.authUser, userController.logout);
router.put('/v1/profile/update',authMiddleware.authUser, userController.updateUser);


module.exports = router;