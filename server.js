/* Variabler */
const express = require('express');
const bodyParser = require('body-parser');
//const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.use("/api");

app.listen(port, () => {
    console.log('Server is running on port: '+port);
})