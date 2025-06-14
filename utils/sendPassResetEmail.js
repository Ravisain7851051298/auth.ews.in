const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: req.body.email,
    subject: 'Password Reset Request',
    text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
});
