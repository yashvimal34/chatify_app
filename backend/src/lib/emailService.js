import nodemailer from 'nodemailer';
import { ENV } from './env.js';
import { resendClient, sender } from './resend.js';

// Create Ethereal test account for development
const createTestAccount = async () => {
    if (ENV.DEV_EMAIL_USER && ENV.DEV_EMAIL_PASS) {
        return {
            user: ENV.DEV_EMAIL_USER,
            pass: ENV.DEV_EMAIL_PASS
        };
    }
    const testAccount = await nodemailer.createTestAccount();
    console.log('Ethereal Email credentials:', testAccount);
    return testAccount;
};

// Configure transporter based on environment
export const configureEmailTransport = async () => {
    if (ENV.NODE_ENV === 'production') {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: ENV.SMTP_USER,
                pass: ENV.SMTP_PASS
            }
        });
    } else {
        const testAccount = await createTestAccount();
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }
};

// Try sending with Resend first, fallback to SMTP
export const sendEmail = async (options) => {
    try {
        // First try with Resend
        const { data, error } = await resendClient.emails.send({
            from: `${sender.name}<${sender.email}>`,
            to: options.to,
            subject: options.subject,
            html: options.html
        });

        if (!error) {
            console.log('Email sent successfully via Resend:', data);
            return { success: true, service: 'resend', data };
        }

        // If Resend fails, try SMTP
        const transport = await configureEmailTransport();
        const info = await transport.sendMail({
            from: `${ENV.EMAIL_FROM_NAME}<${ENV.EMAIL_FROM}>`,
            to: options.to,
            subject: options.subject,
            html: options.html
        });

        console.log('Email sent successfully via SMTP:', info.messageId);

        // For development, log Ethereal URL to view the email
        if (ENV.NODE_ENV !== 'production') {
            console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        }

        return { success: true, service: 'smtp', data: info };

    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};