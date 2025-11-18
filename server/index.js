const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express();

// comment

const JWT_SECRET = process.env.JWT_SECRET

app.use(cors())
app.use(express.json());

let users = []

app.get('/hello', (req, res) => {
    res.json({ msg: "Hello world" });
})

app.post('/auth/register', async (req, res) => {
    try {
        let body = req.body;
        let username = body.username;
        let password = body.password;

        // Check if user already exists
        const existingUser = users.find(user => user.username === username)
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword
        }

        users.push(newUser);

        // Generate JWT token 
        const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '24h' })

        console.log(users)
        res.json({ 
            message: "Registration successful",
            token,
            id: newUser.id,
            username: newUser.username 
        });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" })
    }
})

app.post('/auth/login', async (req, res) => {
    try {
        let body = req.body;
        let username = body.username;
        let password = body.password;

        // Find user by username
        const user = users.find(u => u.username === username)
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
            username: user.username 
        });
    } catch (error) {
        res.status(500).json({ error: "Login failed" })
    }
})

app.listen(3000, () => {
    console.log("app is listening on port 3000")
})

// http://localhost:3000/hello
// http://localhost:3000/auth/register (POST)
// http://localhost:3000/auth/login (POST)