require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors({
    origin: '*'
}));

app.use(express.json()); // IMPORTANT

// Health Route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                error: 'All fields are required!'
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${subject}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: 'Message sent successfully!'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to send message.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
