import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { ENV } from "../lib/env.js";

export const arcjetProtection = async (req, res, next) => {
    try {
        // Skip Arcjet checks in non-production environments to avoid
        // blocking local development tools like Postman.
        if (ENV.NODE_ENV !== "production") {
            // console.debug can be enabled if needed for troubleshooting
            // console.debug("Arcjet protection skipped (non-production)");
            return next();
        }
        const decision = await aj.protect(req)

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
            }
            else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied" });

            } else {
                return res.status(403).json({ message: "Access deinied by security policy" })
            }
        }

        // Check some spoofed bots
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed Bot detected",
                message: "Malicous bot activity detected.",
            });
        }

        next();

    } catch (error) {
        console.log("Arcjet Protection Error:", error);
        next();
    }
}