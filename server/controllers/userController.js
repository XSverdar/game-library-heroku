const userModel = require('../models/users')
const { deleteOldImage } = require('../utils/fileCleaner')
const mongoose = require('mongoose')


const viewUser = (req, res) => {
  const { id } = req.params
  userModel.getById(id, (err, result) => {
    if (err) {
      return res.status(500).send()
    }
    res.json({ 
      username: result.username,
      email: result.email,
      description: result.description,
      image: `http://localhost:3000/${result.image}`
    })
  })
}

const updateUser = (req, res) => {
  const { id } = req.params
  
  const { username, email, description } = req.body

  // if user didn't upload a file
  if (!req.file) {
    const obj = {
      username: username,
      email: email,
      description: description
    }
    // console.log('here!!')
    // console.log(typeof id)
    userModel.updateById(id, obj, (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send()
      }
      console.log(result + '--- updateUser')
      return res.status(200).send('Account updated!')
    })

  }
  else {
    const obj = {
      username: username,
      email: email,
      description: description,
      image: req.file.path
    }
    // get old file link first
    // 
    let oldImage = ''
    userModel.getOne(id, (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        oldImage = result.image
      }
    })
    
    userModel.updateById(id, obj, (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send('Something wrong happened')
      }
      deleteOldImage(oldImage)
      console.log(result)
      return res.status(200).send('Account updated!')

    })
  }
}

const deleteUser = (req, res) => {
  const { id } = req.params
  let oldImage = ''
  userModel.getOne({_id: id}, (err, result) => {
    // doesn't work 
    if (result) {
      console.log(err)
    }
    else {
      oldImage = result.image
      console.log(oldImage)
    }
  })
  userModel.deleteById(id, (err, result) => {
    if (err) {
      return res.status(500).send()
    }
    deleteOldImage(oldImage)
    return res.status(200).send(`Successfully deleted user ${result.username}`)
  })
}

const viewOwnedGames = (req, res) => {
  const { id } = req.params
  userModel.getOwnedGames(id, (err, result) => {
    if (err) {
      throw new Error(err)
    }
    res.json({
      ownedgames: result[0].ownedgames
    })
  })
}

const addToLibrary = (req, res) => {
  const { id } = req.params
  const { gameId } = req.body
  console.log('gameId' + gameId)
  userModel.addGame(id, gameId, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
    return res.status(200).send('Successfully added game to user.')
  })
}

module.exports = {
  viewUser,
  updateUser,
  deleteUser,
  viewOwnedGames,
  addToLibrary
}