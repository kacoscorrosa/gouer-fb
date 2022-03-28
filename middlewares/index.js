const validateFields = require('./validate-fields');
const validateRoles = require('./validate-roles');
const validateToken = require('./validate-token');

module.exports = {
    ...validateFields,
    ...validateRoles,
    ...validateToken
}