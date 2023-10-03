
// exports.profile_show_get = (req, res) => {
//     User.findById(req.query.id)
//       .then((user) => {
//         res.render('profile/profile', { user })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
// }

// //Get Edit profile Page
// exports.profile_edit_get = (req, res) => {
// User.findById(req.query.id)
//   .then((user) => {
//     console.log(user)
//     res.render('profile/edit', { user })
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// }

// exports.profile_edit_post = async (req, res) => {
// const userId = req.body.id
// const { firstName , lastName,companyName,companyCR,city,address,phone,password} =
//   req.body

//   try {
//     let updatedUser = {
//       firstName,
//       lastName,
//       companyName,
//       companyCR,
//       city,
//       address,
//       phone,
 
//     }
//     if (password) {
//       const salt = await bcrypt.genSalt(15)
//       const hashedPassword = await bcrypt.hash(password, salt)
//       updatedUser.password = hashedPassword
//     }
//     console.log(userId)
//     console.log(updatedUser)
//     await User.findByIdAndUpdate(userId, updatedUser)
//     res.redirect("/profile?id="+userId)
//   } catch (err) {
//     console.log(err)
//     res.send("Error updating user.")
//   }
// }
// //change password
// exports.profile_changePassword_get=(req,res)=>{
// res.render('profile/changepassword')
// }
// exports.profile_changePassword_post=(req,res)=>{

//   User.findById(req.body.user).then((user)=>{
//     const equals=bcrypt.compareSync(req.body.password, user.password)
//       if(!equals){
//         res.redirect('/profile/changepassword')
//       }
//       else if (req.body.newPassword === req.body.confirmPassword) {
//         let hash = bcrypt.hashSync(req.body.newPassword, salt)
//         user.password=hash
//         user.save().then(()=>{
//           res.redirect('/auth/login')
//         })
//       }
//       else{
//         res.redirect('/profile/changepassword')
//       }
    
    
//   }).catch(err=>{console.log(err)})

// }