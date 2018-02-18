/*
 * @Author: AngelaDaddy 
 * @Date: 2018-02-18 22:53:00 
 * @Last Modified by: monodev
 * @Last Modified time: 2018-02-19 02:04:14
 * @Description: MVC Router
 */
const router = require('express').Router()
const users = require('../controllers/users')
const passport = require('passport')
const auth = require('../services/auth')


router.get('/', auth.requrieAuth, (req, res) => {
    res.render('index.html')
})

/**
 * login
 */
router.get('/signin', (req, res) => {
    res.render('signin.html')
})
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
}))
/**
 * register
 */
router.post('/signup', users.create)


/**
* Error handling
*/
router.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
        && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
        res.status(422).render('422', { error: err.stack });
        return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
});

// assume 404 since no middleware responded
router.use(function (req, res) {
    const payload = {
        url: req.originalUrl,
        error: 'Not found'
    };
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).render('404', payload);
});

module.exports = router