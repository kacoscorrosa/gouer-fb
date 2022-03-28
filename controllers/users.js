const { response } = require("express");
const User = require('../models/user');
const admin = require('../database/firebase');

const createUser = async(req, res = response) => {

    const name = req.body.name.toLowerCase();
    let surname = req.body.surname;

    if (surname) {
        surname = req.body.surname.toLowerCase();
    }

    const { email, password, rol } = req.body;

    try {

        const user = await admin.auth().createUser({
            email: email,
            emailVerified: false,
            password: password,
            disabled: false,
          });

        const userDB = new User({ name, email, rol, surname, f_uid: user.uid});

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

    console.log(req.userAuth);
    console.log(req.fbUid);

    const { limit, from } = req.query;
    const query = {state: true};

    let [total, users] = await Promise.all([
        User.count(query),
        User.find(query)
            .skip(Number(from - 1))
            .limit(Number(limit))
    ]);
    
    res.status(200).json({
        total,
        users
    });
}

const updateUser = async(req, res) => {

    const { id } = req.params;

    let { _id, email, role, name, surname, job, password, ...rest } = req.body;

    if (name) {
        rest.name = name.toLowerCase();
    }

    if (surname) {
        rest.surname = surname.toLowerCase();
    }

    if (job) {
        rest.job = job.toLowerCase();
    }

    if (password) {
        rest.password = password;
    }

    await admin.auth().updateUser(req.fbUid, {
        password,
        disabled: false });

    const userDB = await User.findByIdAndUpdate(id, rest, {new: true} );

    res.status(200).json(userDB);
}

const deleteUser = async(req, res) => {

    const { id } = req.params;

    const user = await User.findById(id);
    
    await admin.auth().deleteUser(user.f_uid);

    const userDB = await User.findByIdAndDelete(id);

    res.status(200).json({
        userDB
    });
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}