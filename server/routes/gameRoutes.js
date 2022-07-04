const express = require('express')
const gameController = require('../controllers/gameController')
const auth = require('../middleware/auth')
const { gameUpload } = require('../middleware/imageUpload')

const router = express.Router()

// used to create the user
router.post('/', gameUpload.single('image'), gameController.createGame)
router.get('/:id', gameController.viewGame)
router.get('/', gameController.viewGames)
router.patch('/:id', gameUpload.single('image'), gameController.updateGame)
router.delete('/:id', gameController.deleteGame)

module.exports = router