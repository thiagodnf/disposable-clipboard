const dateUtils = require('../utils/date.utils');
const clipboardService = require("../services/clipboard.service");
const generateQRCode = require('qrcode');
const url = require('url');

exports.create =  async function(req, res, next) {

    const {content, expirationDate } = req.body;

    const expiration = dateUtils.expirationDates[expirationDate];

    const clipboard = clipboardService.save(content, expiration);

    var clipboardURL = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: clipboard.id,
    });

    const qrcode = await generateQRCode.toDataURL(clipboardURL);

    res.render('success.ejs',{
        qrcode: qrcode,
        clipboardURL: clipboardURL
    });
};

exports.view = function(req, res, next) {

    //http://localhost:3000/KOfW7f7cRh


    console.log(req.params)
    res.render('clipboard.ejs',{
        clipboard: "oi"
    });
};
