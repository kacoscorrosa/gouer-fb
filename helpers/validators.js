const User = require('../models/user');
const Parking = require('../models/parking');
const Reserve = require('../models/reserve');

const validEmail = async(email = '') => {

    const existEmail = await User.findOne({email});
    
    if (existEmail) {
        throw new Error('The email is already registered');
    }
}

const validateUserByID = async(id = '') =>  {

    const user = await User.findById(id);
    if ( !user ) {
        throw new Error('Invalid ID');
    }
}

const validateParkingByID = async(id = '') =>  {

    const parking = await Parking.findById(id);
    if ( !parking ) {
        throw new Error('Invalid ID');
    }
}

const validateParkingByLocation = async(location = '') => {

    const parkings = await Parking.findOne({ location });
    if (parkings) {
        return res.status(400).json({
            msg: 'Address is already registered' 
        });
    }
}

const validateReserveByID = async(id = '') => {

    const reserve = await Reserve.findById(id);

    if ( !reserve ) {
        throw new Error('Invalid ID');
    }
}

module.exports = {
    validEmail,
    validateUserByID,
    validateParkingByID,
    validateParkingByLocation,
    validateReserveByID
}