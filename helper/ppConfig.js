const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false)
        }
        if (!user.verifyPassword(password)) {
          return done(null, false)
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

module.exports = passport
