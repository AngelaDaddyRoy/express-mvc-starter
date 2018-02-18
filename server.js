const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const mongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
const flash = require('connect-flash')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const config = require('./config')
//get env
const env = process.env.NODE_ENV || 'development'
//instantiate the server
const app = express()

//database
require('./app/services/db').connect()
// bootstrap models
// const models = path.join(__dirname,'app/models')
// fs.readdirSync(models)
//   .filter(file => ~file.search(/^[^\.].*\.js$/))
//   .forEach(file => require(path.join(models, file)))

// CookieParser & session, cookie should be above session
app.use(cookieParser());
app.use(cookieSession({ secret: 'monodev' }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'monodev',
    store: new mongoStore({
        url: config.mongoConnStr,
        collection: 'sessions'
    })
}));
//flash
app.use(flash())
//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//method override
app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}))
// Don't log during tests
// Logging middleware  
if (env != 'test') {
    app.use(morgan('dev'))
}

//view engine
app.set('views', config.viewsPath)
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});


//passport
const passport = require('./app/services/passport').init(app)

//routers
app.use('/', require('./app/routers/routes'))


//let's start the server
const port = process.env.port || config.port
app.listen(port, () => {
    console.log(require('chalk').green(`Server started on port ${port}`))
});