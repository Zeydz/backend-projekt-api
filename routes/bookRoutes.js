const express = require("express");
const app = express();
const router = express.Router();
const Booking = require("../models/Book");
const verifyToken = require('../routes/verifyToken');
const cors = require('cors');
app.use(cors());

/*  Route för att skapa en ny bokning */
router.post("/bookings", async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* Route för att hämta alla bokningar */
router.get("/bookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Ta bort en bokning */
router.delete('/bookings/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
      const deletedRes = await Booking.findByIdAndDelete(id);
      res.json({ message: 'Bokning borttagen', deletedRes });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
