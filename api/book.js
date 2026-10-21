export default async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

        // Extract variables with clean fallbacks supporting both payload formats
        const patientName = body.patientName || body.patientData?.fullName || body.patientData?.name || "Patient";
        const doctorName = body.doctorName || body.activeDoctor?.name || "General Physician";
        const date = body.date || body.bookingDate || "Scheduled Date";
        const timeSlot = body.timeSlot || body.selectedSlot || "Confirmed Slot";
        const rawPhone = body.phone || body.patientPhone || body.patientData?.phone || "";

        // Normalize phone number (digits only, enforce 91 country code if standard 10-digit number)
        const cleanPhone = String(rawPhone).replace(/\D/g, "");
        const formattedPhone = cleanPhone
            ? (cleanPhone.startsWith("91") && cleanPhone.length > 10 ? cleanPhone : cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone)
            : "";
        const bookingId = `AC-${Math.floor(100000 + Math.random() * 900000)}`;

        // 1. Log directly to Google Sheets via Apps Script Webhook
        if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
            try {
                await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        action: "CREATE",
                        bookingId: bookingId,
                        name: patientName,
                        patientName: patientName,
                        phone: formattedPhone || rawPhone,
                        doctor: doctorName,
                        doctorName: doctorName,
                        date: date,
                        time: timeSlot,
                        timeSlot: timeSlot,
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (sheetErr) {
                console.error("Google Sheets write error:", sheetErr);
            }
        }

        // 2. Dispatch WhatsApp Notification via Meta Cloud API if configured and phone is provided
        let metaData = null;
        if (process.env.PHONE_NUMBER_ID && process.env.ACCESS_TOKEN && formattedPhone) {
            try {
                const metaResponse = await fetch(
                    `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`,
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            messaging_product: "whatsapp",
                            to: formattedPhone,
                            type: "template",
                            template: {
                                name: "hello_world",
                                language: {
                                    code: "en_US"
                                }
                            }
                        })
                    }
                );

                metaData = await metaResponse.json();
            } catch (metaErr) {
                console.error("Meta dispatch error:", metaErr);
                metaData = { error: metaErr.message };
            }
        }

        return res.status(200).json({
            success: true,
            bookingId: bookingId,
            metaStatus: metaData || "Meta API credentials not configured or phone missing"
        });
    } catch (err) {
        console.error("Booking error:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
}