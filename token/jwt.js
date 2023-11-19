
const jwt = require('jsonwebtoken');

const secretKey = process.env.secretKey;

exports.authenticate = (req, res, next) => {

    const token = req.header('Authorization');

    console.log('Received Token:', token);

    if (!token) {

        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {

        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
        req.user = decoded;
        console.log('Token is valid:', decoded);
        next();
    } catch (ex) {
        console.error('Invalid token:', ex);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

exports.jwt = jwt; 