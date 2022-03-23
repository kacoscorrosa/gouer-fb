const { response } = require("express");
const User = require('../models/user');
const admin = require('../database/firebase');

const createUser = async(req, res = response) => {

    const name = req.body.name.toLowerCase();
    const surname = req.body.surname.toLowerCase();

    const { email, password } = req.body;

    try {

        const user = await admin.auth().createUser({
            email,
            password,
            displayName: `${name} ${surname}` });

        const userDB = new User({ name, email, surname, provider: user.providerData[0].providerId });

        await userDB.save();

        return res.status(200).json(userDB);
        
    } catch (error) {

        console.log(error);

        res.status(400).json({
            msg: 'Error creating user',
            error
        });        
    }
}

const getUsers = async(req, res) => {

    const user = await User.find({ state: true });

    res.status(200).json({
        user
    });
}

const updateUser = async(req, res) => {

    res.json({
        msg: 'ok put'
    })
}

const deleteUser = async(req, res) => {

    res.json({
        msg: 'ok delete'
    })
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}