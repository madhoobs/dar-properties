const express = require('express')
const multer  = require('multer')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '' + Date.now() + '' + file.originalname)
    }
  })
  var upload = multer({ storage: storage}).single('uploads')

  const userCtrl = require('../controllers/auth')

router.get('/profile', userCtrl.profile_show_get)
router.get('/profile/edit',userCtrl.profile_edit_get)
router.post('/profile/edit', userCtrl.profile_edit_post)
router.get("/profile/changepassword" , userCtrl.profile_changePassword_get)
router.post("/profile/changepassword" , userCtrl.profile_changePassword_post)

module.exports = router

