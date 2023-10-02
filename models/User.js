const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  profileImage :{
    type: String
  },
  isSeller: {
    type: Boolean,
    default: false
  },

  firstName: {
    type: String,
    // required : true , // red star
    // minlength : [2,"First name must be more than 2 characters"] ,
    maxlength: [99, 'This is too much man ... chill !!!!']
  },

  lastName: {
    type: String,
    // required : true , // red star
    // minlength : [2,"Last name must be more than 2 characters"] ,
    maxlength: [99, 'This is too much man ... chill !!!!']
  },

  companyName: {
    type: String,
    // required : true , // red star
    // minlength: [2, 'Last name must be more than 2 characters'],
    maxlength: [99, 'This is too much man ... chill !!!!']
  },

  companyCR: {
    type: String
  },

  city: {
    type: String
  },

  address: {
    type: String
  },

  phone: {
    type: String,
    required: true, // red star
    minlength: [8],
    maxlength: [8]
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: [8]
  },

  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

// Verif Password Method
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
