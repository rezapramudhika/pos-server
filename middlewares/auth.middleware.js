const jwt = require('jsonwebtoken');

module.exports = {
    tokenAuth: (req, res, next) => {
        if (!req.headers.token) {
            return res.status(401).json({
                msg: 'Authentication is required!'
            })
        }
        try {
            jwt.verify(req.headers.token, 'secret-key', function (err, decoded) {
                req.decoded = decoded;
                next()
            })
        } catch (e) {
            return res.status(500).json({
                msg: 'Internal Server Error',
                err: e
            });
        }
    }
}