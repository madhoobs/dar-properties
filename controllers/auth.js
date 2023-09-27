
const User = require("../models/User")

const bcrypt = require("bcryptjs")

let passport = require("../helper/ppConfig")

const salt = 8

exports.auth_signup_get=(req,res)=>{
res.render("auth/signup")
}

exports.auth_signup_post =(req,res)=>{
    let user = User(req.body)

    let hash =bcrypt.hashSync(req.body.inputPassword, salt)
    user.inputPassword = hash 
    console.log(hash)

    user.save()
    .then(() => {
        res.redirect("/")
    })
    .catch((err) => {
        console.log(err)
    })
    } 

exports.auth_login_get = (req , res) => {
    res.render("auth/login")
}

exports.auth_login_post = 
passport.authenticate("local" , {
    successRedirect : "/" ,
    failureRedirect : "/auth/login" 
})

exports.auth_logout_get = (req , res) => {
    req.logout(function(err) {
        if(err) { return next(err)}
        res.redirect("/auth/login")
    })
}