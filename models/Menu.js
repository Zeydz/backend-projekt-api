const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('MenuItem', menuSchema);