const express = require('express');
const test = require('../controllers/userController');

const router = express.Router()

router.get('/',test)

module.exports = router