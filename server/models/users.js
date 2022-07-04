const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    }, 
    email: {
       type: String,
    },
    password: {
        type: String,
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    games: [mongoose.Types.ObjectId]
});

const User = mongoose.model('User', userSchema)

exports.create = function(obj, next) {
    const user = new User(obj)

    user.save(function(err, user) {
        next(err, user)
    })
}
  
  // Retrieving a user based on ID
exports.getById = function(id, next) {
    User.findById(id, function(err, user) {
      next(err, user)
    })
}

exports.getOne = function(query, next) {
    User.findOne(query, function(err, user) {
      next(err, user)
    })
}

exports.updateById = function(id, val, next) {
    User.findByIdAndUpdate(id, val, function(err, user) {
        next(err, user)
    })
}

exports.deleteById = function(id, next) {
    User.findByIdAndDelete(id, function(err, user) {
        next(err, user)
    })
}

exports.getOwnedGames = function(id, next) {
    const objectId = mongoose.Types.ObjectId(id)
    User.aggregate([
        { $match: {_id: objectId} },
        {
            $lookup: {
                from: "games",
                localField: "games",
                foreignField: "_id",
                as: "ownedgames"
            }
        }
    ], function(err, result) {
        next(err, result)
    }) 
}


exports.addGame = function(userId, gameId, next) {
    const objectGameId = mongoose.Types.ObjectId(gameId)
    User.findByIdAndUpdate(
        userId, 
        { 
            $push: {games: objectGameId}
        },
        function(err, result) {
            next(err, result)
    })
}