/* Schema för att skapa en användare i databasen */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
/* Schema */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now}
});

const User = mongoose.model('User', userSchema);
module.exports = User;