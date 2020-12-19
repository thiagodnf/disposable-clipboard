
const FileSync = require('lowdb/adapters/FileSync');
const { customAlphabet } = require('nanoid');
const low = require('lowdb')
const dayjs = require('dayjs')

const alphabet = '1234567890abcdefghijlmnopqrstuvxzwykABCDEFGHIJLMNOPQRSTUVXZWYK';
const nanoid = customAlphabet(alphabet, 10);
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    clipboards: []
}).write()

exports.save = function (content, expiration) {

    const now = dayjs();

    const obj = {
        id: nanoid(10),
        content: content,
        expired_at: now.add(expiration.amount, expiration.unit),
        created_at: now
    };

    db
        .get('clipboards')
        .push(obj)
        .write();

    return obj;
};
