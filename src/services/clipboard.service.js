const FileSync = require('lowdb/adapters/FileSync');
const { customAlphabet } = require('nanoid');
const low = require('lowdb')

const dateUtils = require('../utils/date.utils');

const alphabet = '1234567890abcdefghijlmnopqrstuvxzwykABCDEFGHIJLMNOPQRSTUVXZWYK';
const nanoid = customAlphabet(alphabet, 10);
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    clipboards: []
}).write();

exports.removeExpired = function () {

    const clipboards = db.get('clipboards').value();

    clipboards.forEach(clipboard => {

        if (dateUtils.isExpired(clipboard)){
            this.removeById(clipboard.id);
        }
    });
}

exports.findAll = function () {
    return db.get('clipboards').value();
}

exports.save = function (content, expiration) {

    const now = dateUtils.now();

    const obj = {
        id: nanoid(10),
        content: content,
        expired_at: dateUtils.getExpiredAt(now, expiration,),
        created_at: now
    };

    db
        .get('clipboards')
        .push(obj)
        .write();

    return obj;
};

exports.findById = function (id) {

    return db
        .get('clipboards')
        .find({ id: id })
        .value();
};

exports.removeById = function (id) {

    db.get('clipboards')
        .remove({ id: id })
        .write();
};
