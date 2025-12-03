// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle form submission
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password'
        }
    });

    // Email options
    let mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Thank you for contacting me!',
        text: `Hi ${name},\n\nThank you for reaching out. I will get back to you shortly.\n\nBest Regards,\nJana`
    };

    // Send confirmation email to the user
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }

        // Send notification email to yourself
        let notifyOptions = {
            from: 'your_email@gmail.com',
            to: 'your_email@gmail.com',
            subject: 'New Contact Form Submission',
            text: `You have a new message from ${name} (${email}):\n\n${message}`
        };

        transporter.sendMail(notifyOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }

            res.status(200).send('Emails sent successfully');
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
