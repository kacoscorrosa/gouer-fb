const { response } = require("express");

const User = require('../models/user');

const me = async (req, res = response) => {

    console.log(req.userAuth)

    const {email} = req.userAuth

    const user = await User.findOne({email})

    if (!user) {
        return res.status(404).send({ msg: 'User not found' })
    }

    return res.send(user);
}

module.exports = {
    me
}