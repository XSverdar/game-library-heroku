const fs = require('fs')

function deleteOldImage(dir) {
  if (fs.existsSync(dir)) {
    fs.unlink(dir, (err) => {
      console.log(err)
    })
  }
  console.log('File deleted. -- fileCleaner.js')
}

module.exports = {
  deleteOldImage
}