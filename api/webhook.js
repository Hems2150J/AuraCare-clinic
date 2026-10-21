export default async function handler(req, res) {
    // 1. Meta Webhook Verification (GET)
    if (req.method === "GET") {
        const query = req.query || (req.url ? Object.fromEntries(new URL(req.url, 'http://localhost').searchParams) : {});
        const mode = query["hub.mode"];
        const token = query["hub.verify_token"];
        const challenge = query["hub.challenge"];

        const verifyToken = process.env.VERIFY_TOKEN || "auracare_secret_token_123";

        if (mode === "subscribe" && (token === verifyToken || (process.env.VERIFY_TOKEN && token === process.env.VERIFY_TOKEN))) {
            if (res.setHeader) res.setHeader("Content-Type", "text/plain");
            return res.status(200).send(challenge);
        }
        return res.status(403).send("Forbidden");
    }

    // 2. Incoming Messages & Bot Logic (POST)
    if (req.method === "POST") {
        try {
            const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
            const entry = body?.entry?.[0];
            const changes = entry?.changes?.[0]?.value;
            const message = changes?.messages?.[0];

            if (!message || message.type !== "text") {
                return res.status(200).send("EVENT_RECEIVED");
            }

            const from = message.from; // Patient's WhatsApp number
            const text = message.text?.body?.trim() || "";
            const lower = text.toLowerCase();

            let replyText = "";

            // Intent A: Booking intent (e.g., "Book Dr. Sarah, Oct 22, 10:00 AM")
            if (lower.startsWith("book")) {
                const parts = text.substring(4).split(",").map(s => s.trim());
                const doctor = parts[0] || "General Physician";
                const date = parts[1] || "Tomorrow";
                const time = parts[2] || "10:00 AM";
                const bookingId = `AC-${Math.floor(100000 + Math.random() * 900000)}`;

                // Send row to Google Sheets via Apps Script Webhook
                if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
                    try {
                        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                action: "CREATE",
                                bookingId,
                                name: "WhatsApp Patient",
                                patientName: "WhatsApp Patient",
                                phone: from,
                                doctor,
                                doctorName: doctor,
                                date,
                                time,
                                timeSlot: time,
                                timestamp: new Date().toISOString()
                            })
                        });
                    } catch (err) {
                        console.error("Sheets log failed:", err);
                    }
                }

                replyText = `✅ *Appointment Confirmed!*\n\n• *Booking ID:* ${bookingId}\n• *Doctor:* ${doctor}\n• *Date:* ${date}\n• *Time:* ${time}\n\nPlease arrive 10 minutes early. Type *HR* for career queries or *MENU* for options.`;

            // Intent B: Cancellation
            } else if (lower.includes("cancel")) {
                if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
                    try {
                        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ action: "CANCEL", phone: from })
                        });
                        replyText = "❌ *Appointment Cancelled*\n\nYour appointment has been cancelled and removed from our schedule. Reply *BOOK* if you'd like to reschedule.";
                    } catch (e) {
                        replyText = "⚠️ Error processing cancellation. Please contact reception at +1 (212) 555-0100.";
                    }
                } else {
                    replyText = "❌ *Appointment Cancelled*\n\nYour cancellation request has been noted. Reply *BOOK* if you'd like to reschedule.";
                }

            // Intent C: Basic HR / Careers Bot
            } else if (lower.includes("hr") || lower.includes("job") || lower.includes("career") || lower.includes("hiring")) {
                replyText = `👋 *AuraCare HR Desk*\n\nThank you for your interest in joining AuraCare!\n\n• *Open Positions:* Staff Nurse, Medical Lab Tech, Front Desk Executive\n• *To Apply:* Email your resume to *careers@auracare.com*\n\nTo book an appointment, reply:\n👉 *BOOK <Doctor>, <Date>, <Time>*`;

            // Intent D: Clinic Timings / Address / Location
            } else if (lower.includes("timing") || lower.includes("hour") || lower.includes("location") || lower.includes("address") || lower.includes("where") || lower.includes("map")) {
                replyText = `🏥 *AuraCare Clinic Information*\n\n• *OPD Hours:* Mon-Sat: 8:00 AM - 9:00 PM | Sun: 9:00 AM - 1:00 PM\n• *Casualty:* 24/7 Emergency Available\n• *Address:* 123 Healthcare Ave, Block B, Medical District.\n• *Emergency Triage:* +1 (212) 555-0199`;

            // Intent E: Fees / Pricing
            } else if (lower.includes("fee") || lower.includes("cost") || lower.includes("price")) {
                replyText = "💳 *Consultation Fees:*\n• General OPD: $85 - $110\n• Specialist Consultation: $120 - $150\n• Emergency Triage: 24/7 Available\nWe accept all major health insurance plans (Blue Cross, Aetna, Cigna, Medicare).";

            // Default: Casual Friendly Greeting & Menu
            } else {
                replyText = `Hello! 👋 Welcome to *AuraCare Clinic*.\n\nHow can I help you today?\n\n1️⃣ *Book Appointment:* Reply:\n👉 *BOOK <Doctor>, <Date>, <Time>*\n*(Example: BOOK Dr. Evelyn Reed, Tomorrow, 11:30 AM)*\n\n2️⃣ *Clinic Info & Hours:* Reply *TIMINGS*\n3️⃣ *Location & Directions:* Reply *LOCATION*\n4️⃣ *Consultation Fees:* Reply *FEES*\n5️⃣ *Cancel Appointment:* Reply *CANCEL*\n6️⃣ *Careers & Jobs:* Reply *HR*`;
            }

            // Send the WhatsApp reply back if credentials are set
            if (process.env.PHONE_NUMBER_ID && process.env.ACCESS_TOKEN) {
                try {
                    await fetch(`https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            messaging_product: "whatsapp",
                            to: from,
                            type: "text",
                            text: { body: replyText }
                        })
                    });
                } catch (sendErr) {
                    console.error("WhatsApp message send error:", sendErr);
                }
            }

            return res.status(200).send("EVENT_RECEIVED");
        } catch (e) {
            console.error("Webhook processing error:", e);
            return res.status(200).send("EVENT_RECEIVED");
        }
    }

    return res.status(405).send("Method Not Allowed");
}