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
            res.redirect('/listing?id=' + req.body.listingID)
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
  console.log(req.user._id)
  User.findById(req.user._id)
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
      res.redirect(`/listing?id=${req.body.listingId}`)
    })
    .catch((err) => {
      console.log('Record creation failed. ' + err)
    })
}

exports.comment_edit_get = (req, res) => {
  Comment.findById(req.query.id)
    .then((comment) => {
      res.render('comment/edit', { comment })
    })
    .catch((err) => {
      console.log('Please try again. ' + err)
    })
}
exports.comment_edit_post = async (req, res) => {
  try {
    await Comment.findById(req.body.id).then((comment) => {
      if (req.body.question != null && req.body.question != comment.question) {
        comment.question = req.body.question
      }
      comment
        .save()
        .then(() => {
          res.redirect('/listing?id=' + req.body.listingId)
        })
        .catch((err) => {
          res.send('Try Again')
          console.log(err)
        })
    })
  } catch (err) {
    console.log(err)
    res.send('Error updating comment.')
  }
}

exports.comment_delete_get = (req, res) => {
  Comment.deleteOne({ _id: req.query.id })
    .then(() => {
      res.redirect('/listing?id=' + req.query.listing)
    })
    .catch((err) => {
      console.log('Record deletion failed. ' + err)
    })
}

exports.comment_
