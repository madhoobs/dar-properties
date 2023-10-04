const express = require('express')

const router = express.Router()

const multer = require('multer')

// Controller
const listingCtrl = require('../controllers/listings')

// Require isLoggedIn Middleware
const isLoggedIn = require('../helper/isLoggedln')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '' + Date.now() + '' + file.originalname)
  }
})
var upload = multer({ storage: storage }).single('listingImage')

// Routes
router.get('/listing/add', isLoggedIn, listingCtrl.listing_add_get)
router.post('/listing/add', upload, listingCtrl.listing_add_post)
router.get('/listing', listingCtrl.listing_details_get)
router.get('/listing/edit', isLoggedIn, listingCtrl.listing_edit_get)
router.post('/listing/edit', listingCtrl.listing_edit_post)
router.get('/listing/delete', isLoggedIn, listingCtrl.listing_delete_get)
router.post('/listing/search', listingCtrl.listing_search_post)
router.get('/listing/Villa', listingCtrl.listing_villa_get)
router.get('/listing/Apartment', listingCtrl.listing_apartment_get)

// Exports
module.exports = router
