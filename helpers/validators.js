const User = require('../models/user');

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

module.exports = {
    validEmail,
    validateUserByID
}