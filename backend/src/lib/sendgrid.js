import nodemailer from 'nodemailer';
import { ENV } from './env.js';

// Create a test SMTP service account for development
const createDevTransport = () => {
    return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: ENV.DEV_EMAIL_USER,
            pass: ENV.DEV_EMAIL_PASS
        }
    });
};

// For production using a real SMTP service
const createProdTransport = () => {
    return nodemailer.createTransport({
        service: 'gmail', // or any other service
        auth: {
            user: ENV.SMTP_USER,
            pass: ENV.SMTP_PASS
        }
    });
};

export const emailTransport = ENV.NODE_ENV === 'production'
    ? createProdTransport()
    : createDevTransport();