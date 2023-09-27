const express = require("express");
const mongoose = require("mongoose")
const expressLayouts = require("express-ejs-layouts")
const app = express(); 
app.use(express.static("public"))
const port = process.env.PORT
app.set("view engine" , "ejs");
app.use(expressLayouts);

let session = require("express-session")
let passport = require("./helper/ppConfig")
app.use(session({
secret: process.env.SECRET,
saveUninitialized:true ,
resave: false ,
cookie: {maxAge: 3600000}
}))

app.use(passport.initialize())
app.use(passport.session())


