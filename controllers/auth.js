const User = require('../models/User')

const bcrypt = require('bcryptjs')

const multer = require('multer')

let passport = require('../helper/ppConfig')

const salt = 15


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '' + Date.now() + '' + file.originalname)
  }
})
var upload = multer({
  storage: storage
}).single('data')

exports.auth_signup_get = (req, res) => {
  res.render('auth/signup')
}

exports.auth_signup_post = (req, res) => {
  if (req.body.password === req.body.confirmPassword) {
    let user = User(req.body)

    let hash = bcrypt.hashSync(req.body.password, salt)
    user.password = hash
    if (req.file.filename){ 
    user.profileImage = req.file.filename 
    }
    user
      .save()
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        res.send("Try Again")
        console.log(err)
      }) 
  } else {
    res.redirect('/auth/signup')
    // Let's add a clear error message here
  }
}

exports.auth_login_get = (req, res) => {
  res.render('auth/login')
}

exports.auth_login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
})

exports.auth_logout_get = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
}

exports.profile_show_get = (req, res) => {
      User.findById(req.query.id)
        .then((user) => {
          res.render('profile/profile', { user })
        })
        .catch((err) => {
          console.log(err)
        })
}

//Get Edit profile Page
exports.profile_edit_get = (req, res) => {
  User.findById(req.query.id)
    .then((user) => {
      console.log(user)
      res.render('profile/edit', { user })
    })
    .catch((err) => {
      console.log(err)
    })
}



exports.profile_edit_post = async (req, res) => {
  const userId = req.body.id
  const { firstName , lastName,companyName,companyCR,city,address,phone,password} =
    req.body

    try {
      let updatedUser = {
        firstName,
        lastName,
        companyName,
        companyCR,
        city,
        address,
        phone,
   
      }
      if (password) {
        const salt = await bcrypt.genSalt(15)
        const hashedPassword = await bcrypt.hash(password, salt)
        updatedUser.password = hashedPassword
      }
      console.log(userId)
      console.log(updatedUser)
      await User.findByIdAndUpdate(userId, updatedUser)
      res.redirect("/profile?id="+userId)
    } catch (err) {
      console.log(err)
      res.send("Error updating user.")
    }
  }

