const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const csrf = require('csurf');
const path = require('path')
const createError = require('http-errors');

const indexRoute = require("./src/routes/index.route");
const clipboardRoute = require("./src/routes/clipboard.route");
const clipboardService = require("./src/services/clipboard.service");
const package = require('./package.json');

const PORT = process.env.PORT || 3000;
const REMOVE_EXPIRED = process.env.REMOVE_EXPIRED || 0.2 * 60000;

const app = express();

/**
 * Settings
 */
// app.use(helmet({permittedCrossDomainPolicies: false}));
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/src/views/pages'))
app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' }));
app.use(csrf({ cookie: true }));
app.use(function(req, res, next){
    res.locals.csrftoken = req.csrfToken();
    next();
});
app.use(function(req, res, next){
    res.locals.package = package;
    next();
});

/**
 * Routes
 */
app.use('/', indexRoute);
app.use('/clipboard', clipboardRoute);

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
    next(createError(404));
});

/**
 * Error handler
 */
app.use(function (err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.ejs',{
        errorCode: err.status || 500,
        errorMessage: err.message,
        errorDetails: err.errors || "No details"
    });
});

app.listen(PORT, () => {

    console.log('Running on port: %d', PORT);

    setInterval(function () {
        clipboardService.removeExpired();
    }, REMOVE_EXPIRED);
});
