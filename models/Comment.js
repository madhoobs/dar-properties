const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  // validation
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String
    },
    // authentication
    askingUID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    answeringUID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    listingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true
    }
  },
  // created at , updated at
  {
    timestamps: true
  }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
