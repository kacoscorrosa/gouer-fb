const auth = require('./auth');
const users = require('./users');
const parkings = require('./parkings');
const reserves = require('./reserves');

module.exports = {
    ...auth,
    ...parkings,
    ...users,
    ...reserves
}