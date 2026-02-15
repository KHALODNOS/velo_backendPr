const express = require("express");
const router = express.Router();
const {
  createBookings,
  mybooking,
  cancelBooking,
} = require("../controllers/BookingController");

const { authenticateToken } = require("../middleware/auth");

router.route("/book").post(authenticateToken, createBookings);
router.route("/myBooking").get(authenticateToken, mybooking);
router.route("/:id").delete(authenticateToken, cancelBooking);

module.exports = router;
