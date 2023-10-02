const Comment = require('../models/Comment')
const User = require('../models/User')
const Listing = require('../models/Listing')

// Adding a new comment
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
          user.save()
        })
        .catch((err) => {
          console.log('Adding comment to user failed. ' + err)
        })
    })
    .catch((err) => {
      console.log('Record creation failed. ' + err)
    })
}
