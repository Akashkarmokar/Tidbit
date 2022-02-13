/**
 * External Import
 */
const bcrypt = require('bcrypt');
/**
 * Internal Import
 */
const { unlink } = require('fs');
const path = require('path');
const User = require('../Models/People');
/**
 * Module Scaffolding
 */
const usersController = {};
/**
 * Get Users
 */
usersController.getUsers = async (request, response, next) => {
    // response.render('users');
    try {
        const users = await User.find();
        response.render('users', {
            users,
        });
    } catch (error) {
        next(error);
    }
};
/**
 * Add User
 */
usersController.addUser = async (req, res, next) => {
    let newUser;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashPassword,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashPassword,
        });
    }
    try {
        const result = newUser.save();
        res.status(200).json({
            message: 'User was added successfully!',
        });
    } catch (error) {
        res.status(500).json({
            error: {
                common: {
                    msg: 'Unknown Error Occured!',
                },
            },
        });
    }
};
usersController.removeUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        // remove user avater
        if (user.avatar) {
            unlink(path.join(__dirname, `../public/uploads/avatars/${user.avatar}`), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        res.status(200).json({
            message: 'User was remove successfully',
        });
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Could not remove the user',
                },
            },
        });
    }
};
/**
 * Export Module
 */
module.exports = usersController;
