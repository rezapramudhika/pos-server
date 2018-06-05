const express = require('express');
const router = express.Router();
const { create, findAll, findById, drop } = require('../controllers/user.controller');


/* GET users listing. */
router.get('/find', findAll);
router.get('/find/:id', findById);
router.post('/create', create);
router.delete('/drop/:id', drop);

module.exports = router;
