const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateToken,
        isAdminRole } = require('../middlewares');

const { validateParkingByID,
        validateParkingByLocation} = require('../helpers/validators');

const { getParkings,
        createParking,
        updateParking,
        deleteParking } = require('../controllers');

const router = Router();

router.get('/', [
    validateToken,
    validateFields
], getParkings );

router.post('/', [
    validateToken,
    isAdminRole,
    check('name', 'Name is requerid').not().isEmpty(),
    check('location', 'Location is requerid').not().isEmpty(),
    check('location').custom(validateParkingByLocation),
    check('place', 'Place is requerid').not().isEmpty(),
    check('place', 'Place must be a number').isNumeric(),
    check('horary', 'Horary is requerid').not().isEmpty(),
    validateFields
], createParking );

router.put('/:id', [
    validateToken,
    isAdminRole,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( validateParkingByID ),
    validateFields
], updateParking );

router.delete('/:id', [
    validateToken,
    isAdminRole,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( validateParkingByID ),
    validateFields
], deleteParking );

module.exports = router;