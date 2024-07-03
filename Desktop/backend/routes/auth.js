const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getLogs,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users").get(getUsers);
router.route("/logs").get(getLogs);
router.route("/profile/update").put(updateUser);
router.route("/users/delete/:id").delete(deleteUser);

module.exports = router;
