// API's / functionality /Logic

const Listing = require('../models/Listing')

exports.index_get = (req, res) => {
  Listing.find()
    .populate('uid')
    .then((listings) => {
      res.render('home/index', { listings })
    })
    .catch((err) => {
      console.log('Please try again. ' + err)
    })
}
