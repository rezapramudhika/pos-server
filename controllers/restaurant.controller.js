const Restaurant = require('../models/restaurant.model');

module.exports = {
    create: (req, res) => {
        const { name, address, phone, email, owner } = req.body;
        Restaurant.create({
            name,
            address,
            phone,
            email,
            owner
        }, function (err, response) {
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
}