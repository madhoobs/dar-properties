const express = require('express')

const router = express.Router()

// controller
const commentCtrl = require('../controllers/comment')

// require isLoggedIn Middleware
const isLoggedIn = require('../helper/isLoggedln')

// routes
router.post('/comment/add', commentCtrl.comment_add_post)

// exports
module.exports = router
