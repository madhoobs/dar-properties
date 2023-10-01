const router = require("express").Router()

// controllers
const authCtrl = require("../controllers/auth")
const isLoggedIn = require("../helper/isLoggedln")
const express = require('express')
const multer  = require('multer')

router.use(express.urlencoded({ extended: true }))
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '' + Date.now() + '' + file.originalname)
    }
  })
  var upload = multer({ storage: storage}).single('profileImage')

  const userCtrl = require('../controllers/auth')
// router.use(express.urlencoded({ extended : true}))

// Routes
router.get("/auth/signup" , authCtrl.auth_signup_get)
router.post("/auth/signup", upload, authCtrl.auth_signup_post)
router.get("/auth/login" , authCtrl.auth_login_get)
router.post("/auth/login", authCtrl.auth_login_post)
router.get("/auth/logout" , authCtrl.auth_logout_get)




// Export
module.exports = router