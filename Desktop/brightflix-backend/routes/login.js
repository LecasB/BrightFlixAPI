const express = require('express');
const router = express.Router();

const { getLogin, newLogin } = require("../controllers/loginControl")

router.route('/login').get(getLogin)

router.route('/login/new').post(newLogin)

module.exports = router;