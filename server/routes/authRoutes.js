const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../config/database.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
    try {
        let body = req.body;
        let username = body.username;
        let password = body.password;
        let firstname = body.firstname;
        let lastname = body.lastname;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { username: username }
        })

        console.log(existingUser);

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                firstname: firstname,
                lastname: lastname
            }
        })
        
        console.log(newUser);

        // Generate JWT token 
        const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '24h' })

        res.json({ 
            message: "Registration successful",
            token,
            id: newUser.id,
            username: newUser.username,
            firstname: newUser.firstname,
            lastname: newUser.lastname
        });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" })
    }
})

router.post('/login', async (req, res) => {
    try {
        let body = req.body;
        let username = body.username;
        let password = body.password;

        // Find user by username
        const user = await prisma.user.findUnique({
            where: { username: username }
        })

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" })
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" })
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({ 
            message: "Login successful",
            token,
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        });
    } catch (error) {
        res.status(500).json({ error: "Login failed" })
    }
})

router.put('/update-profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstname: firstName,
                lastname: lastName
            }
        });

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to update profile" })
    }
})

module.exports = router