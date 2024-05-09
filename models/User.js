/* Schema för att skapa en användare i databasen */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/* Schema */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now}
});

/* Jämför lösenord */
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;