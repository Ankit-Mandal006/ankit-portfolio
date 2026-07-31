"use server";

import { Resend } from "resend";

export async function sendContactEmail(formData: FormData) {
  // Pulls your key automatically from .env.local
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Missing RESEND_API_KEY in environment variables.");
    return { success: false, error: "Server configuration error." };
  }

  const resend = new Resend(apiKey);

  const name = formData.get("name") as string;
  const senderEmail = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !senderEmail || !message) {
    return { success: false, error: "Please fill out all fields." };
  }

  try {
    await Promise.all([
      // Email 1: Sent to YOU
      resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["mandal.ankit190506@gmail.com"], // <-- REPLACE WITH YOUR ACTUAL EMAIL
        replyTo: senderEmail,
        subject: `New Message from ${name}`,
        html: `
          <h3>New Message Received</h3>
          <p><strong>From:</strong> ${name} (${senderEmail})</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),

      // Email 2: Confirmation copy sent to the SENDER
      resend.emails.send({
        from: "Ankit Mandal <onboarding@resend.dev>",
        to: [senderEmail],
        subject: "Copy of your message - Ankit Mandal",
        html: `
          <h3>Hi ${name},</h3>
          <p>Thank you for reaching out! Here is a copy of your message:</p>
          <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #00d8f6;">
            ${message}
          </blockquote>
          <p>I will get back to you as soon as possible!</p>
        `,
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Failed to send email." };
  }
}