const express = require('express')

const router = express.Router() ;

const  indexCtrl = require("../controllers/index");

//Routes
router.get("/" , indexCtrl.index_get);



//Export statement
module.exports = router;
