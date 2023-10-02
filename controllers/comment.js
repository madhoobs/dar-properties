const Comment = require('../models/Comment')
const User = require('../models/User')
const Listing = require('../models/Listing')

const moment = require('moment')

// Adding a new comment/question
exports.comment_add_post = (req, res) => {
  let comment = new Comment(req.body)
  comment
    .save()
    .then(() => {
      // res.redirect('/listing?id=' + req.body.listing._id)
      User.findById(req.body.answeringUID)
        .then((user) => {
          console.log(user)
          user.comments.push(comment)
          Listing.findById(req.body.listingID).then((listing) => {
            listing.comments.push(comment)
            listing.save()
          })
          user.save().catch((err) => {
            console.log('Adding comment to user failed. ' + err)
          })
        })
        .catch((err) => {
          console.log('Adding comment to user failed. ' + err)
        })
    })
    .catch((err) => {
      console.log('Record creation failed. ' + err)
    })
}

// Adding a new comment/answer
exports.comment_show_get = (req, res) => {
  console.log(req.query.id)
  User.findById(req.query.id)
    .populate({
      path: 'listings',
      populate: {
        path: 'comments',
        model: 'Comment'
      }
    })
    .then((user) => {
      res.render('comment/questions', { user, moment })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.comment_show_post = (req, res) => {
  Comment.findById(req.body.commentId)
    .then((comment) => {
      comment.answer = req.body.answer
      comment.save()
      res.redirect('/')
    })
    .catch((err) => {
      console.log('Record creation failed. ' + err)
    })
}
