const User = require('../models/User')
const Comment = require('../models/Comment')
const Listing = require('../models/Listing')

// Adding a new listing
exports.listing_add_get = (req, res) => {
  res.render('listing/add')
}
exports.listing_add_post = (req, res) => {
  let listing = new Listing(req.body)
  if (req.file && req.file.filename) {
    listing.photos.push(req.file.filename)
  } else {
    listing.photos.push('apartment-img-test.png')
  }
  listing
    .save()
    .then(() => {
      res.redirect('/')
      User.findById(req.body.uid)
        .then((user) => {
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
exports.listing_edit_get = (req, res) => {
  Listing.findById(req.query.id)
    .then((listing) => {
      res.render('listing/edit', { listing })
    })
    .catch((err) => {
      console.log('Please try again. ' + err)
    })
}
exports.listing_edit_post = async (req, res) => {
  const {
    type,
    location,
    price,
    description,
    areaSize,
    bedrooms,
    bathrooms,
    livingRooms,
    halls,
    parkings
  } = req.body

  try {
    let updatedListing = {
      type,
      location,
      price,
      description,
      areaSize,
      bedrooms,
      bathrooms,
      livingRooms,
      halls,
      parkings
    }
    await Listing.findByIdAndUpdate(req.body.id, updatedListing)
    res.redirect('/listing?id=' + req.body.id)
  } catch (err) {
    console.log('Listing update failed. ' + err)
  }
}

// Deleting an existing listing
exports.listing_delete_get = (req, res) => {
  Listing.deleteOne({ _id: req.query.id })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log('Record deletion failed. ' + err)
    })
}

//serach listing
exports.listing_search_post = (req, res) => {
  const type = req.body.type
  const location = req.body.location
  let condition = {}
  if (type) {
    condition.type = type
  }
  if (location) {
    condition.location = location
  }
  Listing.find(condition).then((listings) => {
    res.render('listing/search', { listings })
  })
}

//on click
exports.listing_villa_get = (req, res) => {
  Listing.find({ type: 'Villa' }).then((listings) => {
    res.render('listing/search', { listings })
  })
}
exports.listing_apartment_get = (req, res) => {
  Listing.find({ type: 'Apartment' }).then((listings) => {
    res.render('listing/search', { listings })
  })
}
