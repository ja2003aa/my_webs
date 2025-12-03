const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    const { name, email, message } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting me!',
        text: `Hi ${name},\n\nThank you for reaching out. I will get back to you shortly.\n\nBest Regards,\nJana`
    };

    try {
        await transporter.sendMail(mailOptions);

        let notifyOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Contact Form Submission',
            text: `You have a new message from ${name} (${email}):\n\n${message}`
        };

        await transporter.sendMail(notifyOptions);

        return {
            statusCode: 200,
            body: 'Emails sent successfully'
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: error.toString()
        };
    }
};
