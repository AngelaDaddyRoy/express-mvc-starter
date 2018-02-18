'use strict'

exports.requrieAuth = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    res.redirect('/signin')
}