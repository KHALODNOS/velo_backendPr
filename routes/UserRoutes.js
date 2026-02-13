const express = require("express");
const {
  inscription,
  Login,
  profile,
} = require("../controllers/UserController");
const vv = require("../middleware/validationSchema");
const { authenticateToken } = require("../middleware/auth");
const validateRegister = require("../middleware/validationSchema");

const router = express.Router();

router.route("/auth/register").post(validateRegister, inscription);
router.route("/auth/login").post(Login);
router.route("/profile").get(authenticateToken, profile);

module.exports = router;
