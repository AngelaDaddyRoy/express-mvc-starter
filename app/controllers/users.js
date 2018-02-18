const mongoose = require('mongoose')
const User = mongoose.model('User')
// const User = require('../models/user')
exports.create = (req, res, next) => {
     User.register(new User({username: req.body.username}),req.body.password,(err)=>{
         if(err) {
             console.log('err while user register!',err)
             return next(err)
         }
          res.redirect('/')
     })
}


exports.singout = (req,res)=>{
   req.logout()
   res.redirect('/signin')
}