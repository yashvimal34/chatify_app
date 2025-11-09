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
    // First try with Resend (if API key is available and client is initialized)
    if (resendClient && ENV.RESEND_API_KEY && sender.email && sender.name) {
        try {
            const { data, error } = await resendClient.emails.send({
                from: `${sender.name}<${sender.email}>`,
                to: options.to,
                subject: options.subject,
                html: options.html
            });

            if (!error) {
                console.log('Email sent successfully via Resend:', data);
                return { success: true, service: 'resend', data };
            } else {
                console.log('Resend returned an error, falling back to SMTP:', error);
            }
        } catch (resendError) {
            console.log('Resend failed, falling back to SMTP:', resendError.message || resendError);
        }
    } else {
        console.log('Resend API key or sender info not configured, using SMTP fallback');
    }

    // If Resend fails or is not configured, try SMTP
    try {
        const transport = await configureEmailTransport();
        const fromEmail = ENV.EMAIL_FROM || sender.email || 'noreply@chatify.com';
        const fromName = ENV.EMAIL_FROM_NAME || sender.name || 'Chatify';
        
        const info = await transport.sendMail({
            from: `${fromName}<${fromEmail}>`,
            to: options.to,
            subject: options.subject,
            html: options.html
        });

        console.log('Email sent successfully via SMTP:', info.messageId);

        // For development, log Ethereal URL to view the email
        if (ENV.NODE_ENV !== 'production') {
            const previewUrl = nodemailer.getTestMessageUrl(info);
            if (previewUrl) {
                console.log('Preview URL:', previewUrl);
            }
        }

        return { success: true, service: 'smtp', data: info };
    } catch (smtpError) {
        console.error('Error sending email via SMTP:', smtpError);
        throw new Error(`Failed to send email: ${smtpError.message || 'Unknown error'}`);
    }
};