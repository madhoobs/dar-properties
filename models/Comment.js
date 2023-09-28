const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  question: String,
  answer: String,
  askingUID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answeringUID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  listingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }
})

// Store the model schema in Comment object and export it
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
