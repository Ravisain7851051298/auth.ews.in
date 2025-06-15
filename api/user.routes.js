const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/api/v1/auth/register', userController.createUser);
router.post('/api/v1/auth/login', userController.login);
router.get('/api/v1/auth/profile', authMiddleware.authUser, userController.getUserProfile);
router.post('/api/v1/auth/forgot-password', userController.forgotPassword);
router.post('/api/v1/auth/reset-password',authMiddleware.authUser, userController.resetPassword);
router.post('/api/v1/auth/logout', authMiddleware.authUser, userController.logout);
router.put('/api/v1/auth/profile/update',authMiddleware.authUser, userController.updateUser);


module.exports = router;