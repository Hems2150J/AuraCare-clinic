export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { patientName, phone, doctorName, date, timeSlot } = req.body;

    if (!patientName || !phone || !doctorName || !date || !timeSlot) {
        return res.status(400).json({ error: 'Missing required booking fields' });
    }

    // Ensure phone has country code 91 without extra spaces or symbols
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const bookingId = `AC-${Date.now().toString().slice(-6)}`;

    try {
        // 1. Save appointment to Google Sheet via your Apps Script URL
        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: "CREATE",
                bookingId: bookingId,
                patientName: patientName,
                phone: formattedPhone,
                doctorName: doctorName,
                date: date,
                timeSlot: timeSlot
            })
        });

        // 2. Send official Meta WhatsApp template to the patient
        const metaResponse = await fetch(`https://graph.facebook.com/v21.0/${process.env.PHONE_NUMBER_ID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: formattedPhone,
                type: "template",
                template: {
                    name: "appointment_confirmation",
                    language: { code: "en_GB" },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                { type: "text", text: patientName },
                                { type: "text", text: doctorName },
                                { type: "text", text: `${date} at ${timeSlot}` },
                                { type: "text", text: process.env.HOSPITAL_MAPS_LINK || "https://maps.google.com" }
                            ]
                        }
                    ]
                }
            })
        });

        const metaData = await metaResponse.json();

        return res.status(200).json({
            success: true,
            bookingId: bookingId,
            metaStatus: metaData
        });

    } catch (error) {
        console.error("Booking error:", error);
        return res.status(500).json({ error: error.message });
    }
}