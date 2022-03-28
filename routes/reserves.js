const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateToken } = require('../middlewares');

const { validateParkingByID,
        validateReserveByID } = require('../helpers/validators');

const { getReserves,
        createReserve,
        deleteReserve } = require('../controllers');

const router = Router();

router.get('/', [
    validateToken,
], getReserves );

router.post('/', [ 
    validateToken,
    check('parking', 'Parking is requerid').not().isEmpty(),
    check('parking', 'Invalid Parking ID').isMongoId(),
    check('parking').custom(validateParkingByID),
    validateFields
], createReserve );

router.delete('/:id', [
    validateToken,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(validateReserveByID),
    validateFields
], deleteReserve );

module.exports = router;