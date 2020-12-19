const dateUtils = require('../utils/date.utils');

exports.index = function(req, res, next) {

    res.render('index.ejs',{
        expirationDates: dateUtils.expirationDates
    });
};
