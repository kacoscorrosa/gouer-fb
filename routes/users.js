const { Router } = require('express');
const { check } = require('express-validator');

const { createUser,
        getUsers,
        updateUser,
        deleteUser } = require('../controllers/users');

const { validEmail,
        validateUserByID } = require('../helpers/validators');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/',[
    check('name', 'Name is requerid').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('email', 'Email is requerid').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( validEmail ),
    check('password', 'The password must contain at least 6 digits').isLength({ min: 6 }),
    validateFields
], createUser );

router.get('/', getUsers );

router.put('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( validateUserByID ),
    validateFields
], updateUser );

router.delete('/', deleteUser );

module.exports = router;