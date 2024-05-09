/* Routes for auth */
const express = require('express');
const User = require('../models/User');
const app = express();
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
app.use(cors());

/* Anslut till databas */
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log('Failed to connect to database', error);
});

router.post('/create-admin', async (req, res) => {
    try {
        /* Hämta användarnamn och lösenord */
        const {username, password} = req.body;

        /* Validering */
        if (!username || !password) {
            return res.status(400).json({ message: 'Fel inmatning, skicka användarnamn och lösenord'})
        }
        
        /* Skapa användare */
        const hashedPassword = await bcrypt.hash(password, 10);
        const adminUser = new User ({
            username: username,
            password: hashedPassword
        });

        /* Spara användaren i databasen */
        await adminUser.save()
        res.status(201).json({ message: 'Adminanvändaren har skapts.'})
    } catch (error) {
        res.status(500).json({ message: 'Det uppstod ett fel' + error});
    }
});

module.exports = router;