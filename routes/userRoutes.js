const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/forgot-password', userController.forgotPassword);
router.get('/view-users', userController.viewUsers);
router.get('/profile/:id', userController.profile);
router.put('/update-profile/:id', userController.updateProfile);
router.post('/verify-code', userController.verifyCode);

module.exports = router;
