const express = require('express')

const router = express.Router()

// controller
const commentCtrl = require('../controllers/comment')

// require isLoggedIn Middleware
const isLoggedIn = require('../helper/isLoggedln')

// routes
router.post('/comment/add', commentCtrl.comment_add_post)
router.get('/comment/show', isLoggedIn, commentCtrl.comment_show_get)
router.post('/comment/show', commentCtrl.comment_show_post)
router.get('/comment/edit', isLoggedIn, commentCtrl.comment_edit_get)
router.post('/comment/edit', commentCtrl.comment_edit_post)
router.get('/comment/delete', isLoggedIn, commentCtrl.comment_delete_get)

// exports
module.exports = router
