const generateQRCode = require('qrcode');
const validator = require('validator');
const url = require('url');

const dateUtils = require('../utils/date.utils');
const clipboardService = require("../services/clipboard.service");

exports.create =  async function(req, res, next) {

    const {content, expirationTime } = req.body;

    const expiration = dateUtils.expirationTimes[expirationTime];

    const clipboard = clipboardService.save(content, expiration);

    res.redirect(`/clipboard/success/${clipboard.id}`);
};

exports.success =  async function(req, res, next) {

    const {clipboardId}  = req.params;

    const clipboard = clipboardService.findById(clipboardId);

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
}

exports.view = function(req, res, next) {

    const {clipboardId} = req.params;

    const clipboard = clipboardService.findById(clipboardId);

    if (dateUtils.isExpired(clipboard)){
        clipboardService.removeById(clipboardId);
    }

    res.render('clipboard.ejs', {
        content: validator.unescape(clipboard.content),
        expiredAt: clipboard.expired_at
    });
};
