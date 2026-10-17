export default async function handler(req, res) {
    // 1. Meta Webhook Verification Handshake (GET)
    if (req.method === 'GET') {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        const verifyToken = process.env.VERIFY_TOKEN || "auracare_secret_token_123";

        if (mode === 'subscribe' && token === verifyToken) {
            console.log("WEBHOOK_VERIFIED");
            return res.status(200).send(challenge);
        }
        return res.status(403).send("Verification token mismatch");
    }

    // 2. Incoming WhatsApp Message Handler (POST)
    if (req.method === 'POST') {
        const body = req.body;

        if (body.object === 'whatsapp_business_account') {
            const entry = body.entry?.[0]?.changes?.[0]?.value;
            const message = entry?.messages?.[0];

            if (message && message.type === 'text') {
                const patientPhone = message.from;
                const text = message.text.body.toLowerCase().trim();

                let reply = "";

                if (text.includes('cancel')) {
                    try {
                        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ action: "CANCEL", phone: patientPhone })
                        });
                        reply = "❌ Your appointment has been cancelled and removed from our schedule.";
                    } catch (e) {
                        reply = "⚠️ Error processing cancellation. Please contact reception.";
                    }
                } else if (text.includes('location') || text.includes('where') || text.includes('address') || text.includes('map')) {
                    reply = `📍 *AuraCare Hospital Address:*\n123 Healthcare Ave, Block B.\nMap: ${process.env.HOSPITAL_MAPS_LINK || "https://maps.google.com"}\nVisitor parking is at Basement 1.`;
                } else if (text.includes('fee') || text.includes('cost') || text.includes('price')) {
                    reply = "💳 *Consultation Fees:*\nGeneral OPD: ₹500 | Specialist: ₹800.\nWe accept UPI, Cards, Cash, and major Health Insurance TPAs.";
                } else {
                    reply = "👋 *AuraCare Support*\nHow can we help? Reply with:\n• *Location* (map & directions)\n• *Fees* (pricing & insurance)\n• *Cancel* (cancel appointment)";
                }

                try {
                    await fetch(`https://graph.facebook.com/v21.0/${process.env.PHONE_NUMBER_ID}/messages`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            messaging_product: "whatsapp",
                            recipient_type: "individual",
                            to: patientPhone,
                            type: "text",
                            text: { body: reply }
                        })
                    });
                } catch (err) {
                    console.error("Failed to send WhatsApp message:", err);
                }
            }

            return res.status(200).send('EVENT_RECEIVED');
        }

        return res.status(404).send('Not Found');
    }

    return res.status(405).send('Method Not Allowed');
}
