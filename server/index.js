const dotenv = require('dotenv')
dotenv.config();

const prisma = require('./config/database.js');
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes.js')

const app = express();

app.use(cors())
app.use(express.json());

// Use auth routes
app.use('/auth', authRoutes)

app.get('/hello', (req, res) => {
    res.json({ msg: "Hello world" });
})

app.listen(3000, () => {
    console.log("app is listening on port 3000");
})

// http://localhost:3000/hello
// http://localhost:3000/auth/register (POST)
// http://localhost:3000/auth/login (POST)
// http://localhost:3000/auth/update-profile (PUT)