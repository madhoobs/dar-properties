const mongoose = require('mongoose')

const listingSchema = mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: String,
  location: String,
  price: Number,
  description: String,
  photos: [String],
  areaSize: Number,
  bedrooms: Number,
  bathrooms: Number,
  livingRooms: Number,
  halls: Number,
  parkings: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

// Store the model schema in Listing object and export it
const Listing = mongoose.model('Listing', listingSchema)
module.exports = Listing
