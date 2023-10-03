const User = require('../models/User')
const Comment = require('../models/Comment')
const Listing = require('../models/Listing')

// Adding a new listing
exports.listing_add_get = (req, res) => {
  res.render('listing/add')
}
exports.listing_add_post = (req, res) => {
  let listing = new Listing(req.body)
  listing
    .save()
    .then(() => {
      res.redirect('/')
      User.findById(req.body.uid)
        .then((user) => {
          console.log(user)
          user.listings.push(listing)
          user.save()
        })
        .catch((err) => {
          console.log('Adding listing to user failed. ' + err)
        })
    })
    .catch((err) => {
      console.log('Record creation failed. ' + err)
    })
}

// Showing details of a single listing
exports.listing_details_get = (req, res) => {
  Listing.findById(req.query.id)
    .populate('uid')
    .populate('comments')
    .then((listing) => {
      res.render('listing/detail', { listing })
    })
    .catch((err) => {
      console.log('Please try again. ' + err)
    })
}

// Updating an existing listing
exports.listing_edit_get = (req, res) => {}
exports.listing_edit_post = (req, res) => {}

// Deleting an existing listing
exports.listing_delete_get = (req, res) => {
  Listing.deleteOne({ _id: req.query.id })
    .then(() => {
      res.redirect('/profile?id=' + currentUser._id)
    })
    .catch((err) => {
      console.log('Record deletion failed. ' + err)
    })
}
