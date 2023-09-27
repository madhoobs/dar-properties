const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({

    type : {


    },

    firstName : {
        type : String ,
        required:true , // red star
        minlength : [2,"First name must be more than 2 characters"] ,
        maxlength : [99, "This is too much man ... chill !!!!"]
    },

lastName :{
    type : String ,
    required:true , // red star
    minlength : [2,"Last name must be more than 2 characters"] ,
    maxlength : [99, "This is too much man ... chill !!!!"]
},

companyName : {
    type : String ,
    required:true , // red star
    minlength : [2,"Last name must be more than 2 characters"] ,
    maxlength : [99, "This is too much man ... chill !!!!"]

},

phoneNumber : {
    type : String ,
    required:true , // red star
    minlength : [8] ,
    maxlength : [8]

},

inputEmail : {
    type : String ,
    required : true ,
    lowercase : true,
    unique : true
},

inputPassword : {
    type : String ,
    required : true ,
    minlength : [8]
},

gridCheck : {
    require : true
}

})

// Verif Password Method
userSchema.methods.verifyPassword = function(inputPassword) {
    console.log("inputPassword" , inputPassword)
    console.log("this.inputPassword" , inputPassword)
    return bcrypt.compareSync(inputPassword,this.inputPassword)
}

const User = mongoose.model("User" , userSchema)

module.exports = User