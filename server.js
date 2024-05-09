/* Variabler */
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Routes */
app.use('/api', authRoutes);

/* Lyssna på port */
app.listen(port, () => {
    console.log(`Server running at port:${port}`);
});