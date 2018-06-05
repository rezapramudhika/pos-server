const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
    register: (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        const hash = bcrypt.hashSync(password, salt);
        User.create({ email, password: hash, firstName, lastName }, function (err, response) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'Internal Server Error'
                });
            }
            res.status(201).json({
                msg: 'Success',
                data: response
            });
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;
        User.findOne({ email })
            .then(response => {
                if (response) {
                    if (bcrypt.compareSync(password, response.password)) {
                        const token = jwt.sign({
                            id: response._id,
                            email: response.email,
                            firstName: response.firstName,
                            lastName: response.lastName
                        }, 'secret-key');
                        res.status(200).json({
                            msg: 'Success',
                            token
                        });
                    }
                }
                res.status(404).json({
                    msg: 'User not found'
                });
            })
    }
}