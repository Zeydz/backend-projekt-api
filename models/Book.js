const mongoose = require('mongoose');

/* Bokningsmodell */
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  message: {
    type: String
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;