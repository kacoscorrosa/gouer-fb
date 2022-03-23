const { response } = require("express");

const User = require('../models/user');

const validate = async (req, res = response) => {

    const { userAuth } = req;
    console.log(req.userAuth);

    const { sign_in_provider } = userAuth.firebase

    try {

        if (sign_in_provider === 'password') {

            const user = await User.findOne({ email: userAuth.email })

            if (!user) {
                return res.status(401).json({
                    msg: 'wrong username/password'
                })
            }

            return res.status(400).json({
                msg: 'success!', user
            })

        } else {
            return res.status(401).json({ msg: 'wrong username/password' })
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: 'wrong username/password' })
    }
}

module.exports = {
    validate
}