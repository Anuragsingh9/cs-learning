const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (req.query.userId != decoded.userId) {
            res.status(401).json({ error: 'Token missmatched' });
        }
        // req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;