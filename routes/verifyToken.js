/* Middleware för att hantera JWT-Token */
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token saknas'});
    }

    /* Extrahera token */
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if (err) {
            return res.status(401).json({ message: 'Ogiltig token'});
        }

        req.username = username;
        next();
    })
}

module.exports = verifyToken;