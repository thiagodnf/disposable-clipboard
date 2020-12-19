const dayjs = require('dayjs');

exports.expirationTimes = {
    '0sec': {label: 'Expire when viewed', amount: 0, unit: 'second', method: 'manual', selected: 'selected' },
    '30sec': {label: 'Expire in 30 seconds', amount: 30, unit: 'second', method: 'auto', selected: '' },
    '1min': {label: 'Expire in 1 minute', amount: 1, unit: 'minute', method: 'auto', selected: '' },
    '10min': {label: 'Expire in 10 minutes', amount: 10, unit: 'minute', method: 'auto', selected: '' },
    '1hour': {label: 'Expire in 1 Hour', amount: 1, unit: 'hour', method: 'auto', selected: '' }
};

exports.getExpiredAt = function(now = dayjs(), expiration) {
    return now.add(expiration.amount, expiration.unit);
};

exports.isExpired = function (clipboard) {
    return dayjs().isAfter(dayjs(clipboard.expired_at));
};

exports.now = function () {
    return dayjs();
};
