const Booking = require("../models/Booking");

const Velo = require("../models/Velo");

exports.createBookings = async (req, res) => {
  try {
    const { bikeId, startDate, endDate } = req.body;

    const userId = req.user.id;

    const bike = await Velo.findById(bikeId);

    if (!bike) return res.status(404).json({ error: "Bike not found" });

    if (!bike.available)
      return res.status(400).json({ error: "Bike not available" });

    const booking = await Booking.create({
      user: userId,
      bike: bikeId,
      startDate,
      endDate,
    });

    bike.available = false;

    await bike.save();

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user Bokinig

exports.mybooking = async (req, res) => {
  try {
    const booking = await Booking.find({ user: req.user.id }).populate("bike");

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    booking.status = "cancelled";
    await booking.save();

    await Velo.findByIdAndUpdate(booking.bike, { available: true });

    res.json({ success: true, message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
