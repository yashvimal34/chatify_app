import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js"
import { sendEmail } from "../lib/emailService.js"

export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        const result = await sendEmail({
            to: email,
            subject: "Welcome to Chatify!",
            html: createWelcomeEmailTemplate(name, clientURL)
        });

        console.log(`Welcome email sent via ${result.service}`);
        return result;

    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send email");
    }
};