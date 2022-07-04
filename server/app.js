require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const gameRoutes = require('./routes/gameRoutes')

const app = express()

const port = 3000

const dbURI = 'mongodb+srv://<username>:<password>@cluster0.zvcowpw.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true})
    .then((result) => app.listen(port))
    .catch((err) => console.log(err))

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/public/images/avatars', express.static('public/images/avatars'))
app.use('/public/images/games', express.static('public/images/games'))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/games', gameRoutes)

app.use(express.static(path.join(__dirname, "./dist")))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/dist/"));
    app.get("*", (req,res) => {
        res.sendFile(__dirname + "/dist/index.html");
    });
}