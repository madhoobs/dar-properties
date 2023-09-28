const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({

    type : {
        type : Boolean,
        required : true
    },

    firstName : {
        type : String ,
        // required : true , // red star
        minlength : [2,"First name must be more than 2 characters"] ,
        maxlength : [99, "This is too much man ... chill !!!!"]
    },

lastName :{
    type : String ,
    // required : true , // red star
    minlength : [2,"Last name must be more than 2 characters"] ,
    maxlength : [99, "This is too much man ... chill !!!!"]
},

companyName : {
    type : String ,
    // required : true , // red star
    minlength : [2,"Last name must be more than 2 characters"] ,
    maxlength : [99, "This is too much man ... chill !!!!"]

},

companyCR : {
type : String ,

},

phone : {
    type : String ,
    required : true , // red star
    minlength : [8] ,
    maxlength : [8]

},

email : {
    type : String ,
    required : true ,
    lowercase : true,
    unique : true
},

password : {
    type : String ,
    required : true ,
    minlength : [8]
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