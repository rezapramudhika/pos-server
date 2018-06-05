const User = require('../models/user.model');

module.exports = {
    create: (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        User.create({ email, password, firstName, lastName }, function (err, response) {
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
    findAll: (req, res) => {
        User.find()
            .then(response => {
                res.status(200).json({
                    msg: 'Success',
                    data: response
                });
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'Internal server error',
                    err
                })
            })
    },
    findById: (req, res) => {
        User.findById(req.params.id, function (err, response) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'Internal Server Error'
                });
            }
            res.status(200).json({
                msg: 'Success',
                data: response
            });
        });
    },
    drop: (req, res) => {
        User.deleteMany({ email: /test@pos.com/ }, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'Internal Server Error'
                });
            }
            res.status(200).json({
                msg: 'Success'
            });
        });
    }
}