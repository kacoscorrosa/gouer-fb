const { Router } = require('express');
const { check } = require('express-validator');

const { createUser,
        getUsers,
        updateUser,
        deleteUser } = require('../controllers/users');

const { validEmail,
        validateUserByID } = require('../helpers/validators');

const { validateFields } = require('../middlewares/validate-fields');
const { isAdminRole, validateRoleAuth } = require('../middlewares/validate-roles');
const { validateToken } = require('../middlewares/validate-token');

const router = Router();

router.post('/create',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( validEmail ),
    check('password', 'The password must contain a minimum of 6 digits').isLength({ min: 6 }),
    check('rol', 'Role is required').not().isEmpty(),
    check('rol').isIn(['user_role']),
    validateFields
], createUser );

router.get('/', [
    validateToken,
    isAdminRole
], getUsers );

router.put('/:id', [
    validateToken,
    validateRoleAuth,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateUserByID),
    validateFields
], updateUser );

router.delete('/:id', [
    validateToken,
    validateRoleAuth,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateUserByID),
    validateFields
], deleteUser );

module.exports = router;