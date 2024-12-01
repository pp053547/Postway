import nodemailer from 'nodemailer';

// Function to send OTP via email
export const sendOtpEmail = async (email, otpCode) => {
  try {
    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Or use any SMTP service like SendGrid, Mailgun
      auth: {
        user: process.env.EMAIL_USER,  // Gmail/SMTP email
        pass: process.env.EMAIL_PASS,  // Gmail/SMTP password or app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otpCode}. It will expire in 5 minutes.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};
