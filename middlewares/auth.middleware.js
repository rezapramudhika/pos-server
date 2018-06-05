const jwt = require('jsonwebtoken');

module.exports = {
    tokenAuth: (req, res, next) => {
        if (!req.headers.token) {
            console.log('no token')
            return res.status(401).json({
                msg: 'Authentication is required!'
            })
        }
        console.log('has token = ' + req.headers.token)
        try {
            jwt.verify(req.headers.token, 'secret-key', function (err, decoded) {
                console.log(decoded);
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