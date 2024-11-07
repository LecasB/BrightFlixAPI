const express = require("express");
const { GetHeadline } = require("../controllers/headlineController");

const router = express.Router();

router.route("/GetHeadline").get(GetHeadline);

module.exports = router;
