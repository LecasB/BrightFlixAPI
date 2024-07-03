const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getLogs } = require("../controllers/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logs").get(getLogs);

module.exports = router;
