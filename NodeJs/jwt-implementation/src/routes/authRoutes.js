const express = require("express")
const app = express();
const router = express.Router()
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const USERS = [
    { id: 1, name: "Anurag", company: "Crownstack" },
    { id: 2, name: "Divyanshu", company: "Crownstack" },
    { id: 3, name: "Shubham", company: "Crownstack" },
    { id: 4, name: "Varun", company: "Crownstack" }
];
router.post('/login', (req, res) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: 1 }, jwtSecret, { expiresIn: '1h' });
    res.send({ data: 'true', 'token': token });
});

router.get('/user', verifyToken, (req, res) => {
    const userId = req.query.userId;
    const user = USERS.find((user) => {
        return user.id == userId;
    })
    res.send({ data: user, 'isVerified': true });
})

module.exports = router;