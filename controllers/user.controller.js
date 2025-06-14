const userModel = require('../models/user.model');
const PasswordResetModel = require('../models/PasswordReset.model');
const nodemailer = require('nodemailer');

async function createUser(req, res) {
    try {
        const hashedPassword = await userModel.hashPassword(req.body.password);
        const user = await userModel.create({ ...req.body, password: hashedPassword });
        if (!user) {
            return res.status(400).json({ message: 'User not created' });
        }
        const token = user.generateAuthToken();
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


async function login(req, res) {
    try {
        const user = await userModel.findOne({ email: req.body.email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await user.comparePassword(req.body.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getUserProfile(req, res) {
    try {
        const userId = req.user ? req.user._id : req.params.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.user ? req.user._id : req.params.id;
        if (!userId){
            return res.status(400).json({ message: 'User id not found' });
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate token
        const token = user.generateAuthToken();
        if (!token) {
            return res.status(500).json({ message: 'Error generating token' });

        }

        // Save token to PasswordResetModel
        await new PasswordResetModel({
            email,
            token,
            expiresAt: new Date(Date.now() + 3600000), // 1 hour expiry
        }).save();

        // Send email

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const resetLink = `${process.env.FRONTEND_URL}reset-password?token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html:`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="background-color: #f0f0f0; padding: 20px; text-align: center;">Password Reset Request</h2>
                <div style="padding: 20px;">
                    <p>Hello,</p>
                    <p>You recently requested to reset your password for your account. Please click the button below to reset it:</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
                    <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                    <p>Thank you,<br />e-Works services </p>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #888888;">
                    <p>This email was sent by Your Company.</p>
                </div>
            </div>`

        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email', error: error.message });
            } else {
                console.log('Email send:', info.response);
                res.status(200).json({ message: `Reset your password via ${email} ,please check your email..` });
            }
        });
    } catch (error) {
        console.error('Error in forgotPassword function:', error);
        res.status(500).json({ message: error.message });
    }
}

async function resetPassword(req, res) {
    try {
        const { token, password } = req.body;

        const passwordReset = await PasswordResetModel.findOne({
            token,
            expiresAt: { $gt: new Date() },
        });

        if (!passwordReset) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash and update password
        const hashedPassword = await user.hashPassword(password);
        await userModel.updateOne({ email: passwordReset.email }, { password: hashedPassword });

        // Delete all password reset requests for this email (prevents reuse)
        await PasswordResetModel.deleteMany({ email: passwordReset.email });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function logout(req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'Token not provided' });
        }

        // Blacklist the token
        const blacklistedToken = new BlacklistTokenModel({ token });
        await blacklistedToken.save();

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error in logout function:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    getUserProfile,
    updateUser,
    forgotPassword,
    resetPassword,
    logout,
    login
};