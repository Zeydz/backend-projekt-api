/* Routes for auth */
const express = require('express');
const User = require('../models/User');
const verifyToken = require('../routes/verifyToken');
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

/* Skyddad route för admin-panelen */
router.get('/admin-panel', verifyToken, (req, res) => {
    res.json({ message: 'Välkommen till admin-panelen'});
})

router.post('/create-admin', async (req, res) => {
    try {
        /* Hämta användarnamn och lösenord */
        const {username, password} = req.body;
        /* Validering */
        if (!username || !password) {
            return res.status(400).json({ message: 'Fel inmatning, skicka användarnamn och lösenord'})
        }
        /* Skapa användare med hashat lösenord */
        const hashedPassword = await bcrypt.hash(password, 10);
        const adminUser = new User ({
            username: username,
            password: hashedPassword
        });
        /* Spara användaren i databasen */
        await adminUser.save()
        res.status(201).json({ message: 'Adminanvändaren har skapats.'})
    } catch (error) {
        res.status(500).json({ message: 'Det uppstod ett fel: ' + error});
    }
});

/* Logga in användare, skicka tillbaka token */
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        /* Validering */
        if(!username || !password) {
            return res.status(400).json({ message: 'Fel inmatning, skicka användarnamn och lösenord.'})
        }

        /* Titta efter användarnamnet */
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({ message:'Fel användarnamn eller lösenord.'})
        }

        /* Kontrollera lösenord */
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Fel användarnamn/lösenord.'})
        } else {
            const payload = { username: username};
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
            const response = { message: 'Användare inloggad', token: token}
            res.status(200).json({ response });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error: ' + error})
    }
})

module.exports = router;