import { NextRequest, NextResponse } from "next/server";

interface BookingRequest {
    name: string;
    phone: string;
    address?: string;
    email?: string;
    date: string;
    weather?: {
        temp: number;
        description: string;
        windSpeed: number;
    };
    locale: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: BookingRequest = await request.json();
        const { name, phone, address, email, date, weather, locale } = body;

        // Validate required fields
        if (!name || !phone || !date) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const bookingDate = new Date(date);
        const formattedDate = bookingDate.toLocaleDateString(
            locale === "ar" ? "ar-BH" : "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        );

        // Prepare notification message
        const isArabic = locale === "ar";
        const windWarning =
            weather && weather.windSpeed > 6
                ? isArabic
                    ? `⚠️ تحذير: سرعة الرياح ${weather.windSpeed} م/ث`
                    : `⚠️ Warning: Wind speed ${weather.windSpeed} m/s`
                : "";

        const messageEn = `🚁 New Booking Request
    
📋 Client: ${name}
📞 Phone: ${phone}
📍 Address: ${address || "Not provided"}
📧 Email: ${email || "Not provided"}
📅 Date: ${formattedDate}
🌡️ Weather: ${weather?.temp || "N/A"}°C - ${weather?.description || "N/A"}
💨 Wind: ${weather?.windSpeed || "N/A"} m/s
${windWarning}`;

        const messageAr = `🚁 طلب حجز جديد
    
📋 العميل: ${name}
📞 الهاتف: ${phone}
📍 العنوان: ${address || "غير محدد"}
📧 البريد: ${email || "غير محدد"}
📅 التاريخ: ${formattedDate}
🌡️ الطقس: ${weather?.temp || "غ/م"}°س - ${weather?.description || "غ/م"}
💨 الرياح: ${weather?.windSpeed || "غ/م"} م/ث
${windWarning}`;

        const message = isArabic ? messageAr : messageEn;

        // Send WhatsApp notification via Twilio or similar
        const whatsappApiKey = process.env.WHATSAPP_API_KEY;
        const whatsappPhoneId = process.env.WHATSAPP_PHONE_ID;
        const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || "97339939053";

        if (whatsappApiKey && whatsappPhoneId) {
            try {
                // Using WhatsApp Business API
                await fetch(
                    `https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${whatsappApiKey}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            messaging_product: "whatsapp",
                            to: adminPhone,
                            type: "text",
                            text: { body: message },
                        }),
                    }
                );
            } catch (whatsappError) {
                console.error("WhatsApp notification failed:", whatsappError);
            }
        }

        // Send Email notification
        const emailApiKey = process.env.EMAIL_API_KEY;
        const emailFrom = process.env.EMAIL_FROM || "noreply@allweather.bh";
        const adminEmail = process.env.ADMIN_EMAIL;

        if (emailApiKey && adminEmail) {
            try {
                // Using Resend, SendGrid, or similar
                const emailProvider = process.env.EMAIL_PROVIDER || "resend";

                if (emailProvider === "resend") {
                    await fetch("https://api.resend.com/emails", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${emailApiKey}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            from: emailFrom,
                            to: [adminEmail],
                            subject: `🚁 New Booking: ${name} - ${formattedDate}`,
                            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #06b6d4;">🚁 New Booking Request</h2>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Client:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Address:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${address || "Not provided"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${email || "Not provided"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${formattedDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Weather:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${weather?.temp || "N/A"}°C - ${weather?.description || "N/A"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Wind Speed:</strong></td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${weather?.windSpeed || "N/A"} m/s</td>
                    </tr>
                  </table>
                  ${weather && weather.windSpeed > 6
                                    ? `<div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px;">
                          <strong>⚠️ Wind Warning:</strong> High wind speed may affect drone operation. Consider rescheduling.
                        </div>`
                                    : ""
                                }
                  <p style="color: #666; font-size: 12px; margin-top: 20px;">
                    This is an automated notification from ALL Weather Booking System.
                  </p>
                </div>
              `,
                        }),
                    });
                }

                // Also send confirmation to customer if email provided
                if (email) {
                    await fetch("https://api.resend.com/emails", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${emailApiKey}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            from: emailFrom,
                            to: [email],
                            subject: isArabic
                                ? `✅ تأكيد الحجز - ALL Weather`
                                : `✅ Booking Confirmation - ALL Weather`,
                            html: isArabic
                                ? `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
                    <h2 style="color: #06b6d4;">✅ تم تأكيد حجزك</h2>
                    <p>عزيزي ${name}،</p>
                    <p>شكراً لحجزك مع ALL Weather. تفاصيل حجزك:</p>
                    <ul>
                      <li><strong>التاريخ:</strong> ${formattedDate}</li>
                      <li><strong>الخدمة:</strong> تنظيف بالدرون</li>
                    </ul>
                    <p>سيتواصل معك فريقنا قريباً لتأكيد التفاصيل.</p>
                    <p>للاستفسارات: +973 3993 9053</p>
                  </div>
                `
                                : `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #06b6d4;">✅ Your Booking is Confirmed</h2>
                    <p>Dear ${name},</p>
                    <p>Thank you for booking with ALL Weather. Your booking details:</p>
                    <ul>
                      <li><strong>Date:</strong> ${formattedDate}</li>
                      <li><strong>Service:</strong> Drone Cleaning</li>
                    </ul>
                    <p>Our team will contact you soon to confirm the details.</p>
                    <p>For inquiries: +973 3993 9053</p>
                  </div>
                `,
                        }),
                    });
                }
            } catch (emailError) {
                console.error("Email notification failed:", emailError);
            }
        }

        // Log booking (in production, save to database)
        console.log("New booking:", {
            name,
            phone,
            address,
            email,
            date: formattedDate,
            weather,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            message: isArabic ? "تم الحجز بنجاح" : "Booking confirmed",
            bookingId: `BK-${Date.now()}`,
        });
    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
