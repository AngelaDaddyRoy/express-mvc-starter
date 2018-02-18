const passport = require('passport')
//const local = require('passport-local')
const User = require('../models/user')

exports.init = (app) => {
    passport.use(User.createStrategy())
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())

    app.use(passport.initialize())
    app.use(passport.session())
    return passport
}


