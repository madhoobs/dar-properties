const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const app = express()
require('dotenv').config()
app.use(express.static('public'))
const port = process.env.PORT
app.set('view engine', 'ejs')
app.use(expressLayouts)

let session = require('express-session')
let passport = require('./helper/ppConfig')
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 3600000 }
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

// This is to encode the body response & use CSS
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Import Routes
const authRouter = require('./routes/auth')
const listingRouter = require('./routes/listings')
const indexRouter = require('./routes/index')
// const routerRo = require('./routes/auth')
const profileRouter = require("./routes/profile")

//Mount Routes
app.use('/', authRouter)
app.use('/', listingRouter)
app.use('/', indexRouter)
app.use('/',profileRouter)

// Listen to requests on port
app.listen(port, () => {
  console.log(`Dar properties is running on port ${port}`)
})

//MongoDB Connection
mongoose
  .connect(process.env.mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected !!!')
  })

  .catch((err) => {
    console.log('MongoDB is not connected ' + err)
  })
