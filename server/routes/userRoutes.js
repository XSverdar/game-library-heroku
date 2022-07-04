const express = require('express')
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const { avatarUpload } = require('../middleware/imageUpload')

const router = express.Router()

// used to create the user
router.get('/:id', auth.authenticateToken, userController.viewUser)
router.patch('/:id', auth.authenticateToken, avatarUpload.single('image'), userController.updateUser)
router.delete('/:id', auth.authenticateToken, userController.deleteUser)
router.get('/games/:id', userController.viewOwnedGames)
router.patch('/games/:id', userController.addToLibrary)

module.exports = router