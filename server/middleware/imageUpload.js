const multer = require('multer')

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/avatars')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})

const gameStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/games')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

  if (!allowedTypes.includes(file.mimetype)) {
    cb(null, false)
  }
  cb(null, true)
}

const avatarUpload = multer({ 
  storage: avatarStorage,
  limits: { fileSize: 1024 * 1024 * 5}, // by bytes 5MB
  fileFilter: fileFilter
})

const gameUpload = multer({ 
  storage: gameStorage,
  limits: { fileSize: 1024 * 1024 * 5},
  fileFilter: fileFilter
})

module.exports = {
  avatarUpload,
  gameUpload
}