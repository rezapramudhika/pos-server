const express = require('express');
const router = express.Router();
const { create, findAll, findById, drop } = require('../controllers/user.controller');
const { tokenAuth } = require('./../middlewares/auth.middleware')

/* GET users listing. */
router.get('/find', tokenAuth, findAll);
router.get('/find/:id', findById);
router.post('/create', create);
router.delete('/drop', drop);

module.exports = router;
