const nodemailer = require('nodemailer');
// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '../.env') }); 

const sendFacultyMail = async (email, name, username, password) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("CRITICAL: EMAIL_USER or EMAIL_PASS is undefined in mailer.js");
        throw new Error("Missing credentials for PLAIN ");
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASS
        }
    });

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIL_USER, // Must not be undefined
    //         password: process.env.EMAIL_PASS // Must not be undefined
    //     }
    // });

    return await transporter.sendMail({
        from: `"CampusConnect Admin" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Faculty Registration Successful',
        html: `<h3>Welcome Prof. ${name},</h3>
               <p>Username: ${username}</p>
               <p>Password: ${password}</p>`
    });
};

module.exports = { sendFacultyMail };