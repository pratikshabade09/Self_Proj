
const express = require('express');
const bcrypt = require('bcrypt');
// const path = require('path');
const pool = require('./db');
const { sendFacultyMail } = require('./utils/mailer');

const app = express();
require('dotenv').config();

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
app.get('/faculty_register',(req,res)=>{
    res.render('faculty_register');
})

// Route for Registration
app.post('/register-faculty', async (req, res) => {
    console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
    const { name, email, username, password, department, subjects } = req.body;
    console.log("Received registration data:", { name, email, username, department, subjects });

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const subjectData = JSON.stringify(Array.isArray(subjects) ? subjects : [subjects]);

        // MySQL Insert
        const queryText = `INSERT INTO faculty_reg (name, email, username, password, department, subjects) VALUES (?, ?, ?, ?, ?, ?)`;
        await pool.query(queryText, [name, email, username, hashedPassword, department, subjectData]);

        // Send Email
        await sendFacultyMail(email, name, username, password);

        res.send("<h2>Faculty Registered Successfully! Credentials sent to email.</h2>");
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Registration failed. Check console for details.");
    }
});

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});