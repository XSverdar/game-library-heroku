const express = require('express')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

const router = express.Router()

// used to create the user
router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/valid-token', authController.validToken)

module.exports = router