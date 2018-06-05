const express = require('express');
const router = express.Router();
const user = require('./user.route');
const auth = require('./auth.route');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.use('/users', user);
router.use('/auth', auth);

module.exports = router;
