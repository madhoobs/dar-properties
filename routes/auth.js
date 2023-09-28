const router = require("express").Router()

// controllers
const authCtrl = require("../controllers/auth")
const isLoggedIn = require("../helper/isLoggedln")


// router.use(express.urlencoded({ extended : true}))

// Routes
router.get("/auth/signup" , authCtrl.auth_signup_get)
router.post("/auth/signup", authCtrl.auth_signup_post)
router.get("/auth/login" , authCtrl.auth_login_get)
router.post("/auth/login", authCtrl.auth_login_post)
router.get("/auth/logout" , authCtrl.auth_logout_get)




// Export
module.exports = router