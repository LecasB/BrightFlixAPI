const express = require('express');
const router = express.Router();

const { getLogin } = require("../controllers/loginControl")

router.route('/login').get(getLogin)

module.exports = router;