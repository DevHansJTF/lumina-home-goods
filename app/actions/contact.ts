"use server";

import nodemailer from "nodemailer";

export async function processContact(data: any) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn(
      "EMAIL_USER or EMAIL_PASS is missing. Simulating email send. To send real emails, provide your Gmail credentials.",
    );
    return { success: true, warning: "Credentials missing. Contact inquiry processed but no email sent." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Email to admin
  const adminEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #141414;">
      <h1 style="border-bottom: 1px solid #EAEAEA; padding-bottom: 20px;">New Contact Inquiry</h1>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      
      <h2 style="margin-top: 30px;">Message</h2>
      <div style="background-color: #FAFAFA; padding: 20px; border-left: 4px solid #C5A059;">
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
  `;

  // Email to customer
  const customerEmailHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #141414; padding: 40px 20px; background-color: #FAFAFA;">
      <div style="background-color: #ffffff; padding: 40px; border: 1px solid #EAEAEA;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-weight: 300; letter-spacing: 4px; font-size: 24px; color: #141414; margin: 0;">LUMINA</h1>
          <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-top: 10px;">Furniture Services</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.6; color: #333;">Dear ${data.name},</p>
        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          Thank you for reaching out to Lumina. We have received your inquiry regarding "<strong>${data.subject}</strong>".
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          Our concierge team is currently reviewing your message and will get back to you shortly. We pride ourselves on providing bespoke service and look forward to assisting you.
        </p>
        
        <p style="font-size: 15px; line-height: 1.6; color: #333; margin-top: 40px;">
          Warm regards,<br>
          <span style="font-style: italic; font-family: 'Times New Roman', Times, serif; font-size: 18px;">The Lumina Furniture Services</span>
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <p style="font-size: 11px; color: #999; line-height: 1.5;">
          You are receiving this email because you contacted Lumina.<br>
          © ${new Date().getFullYear()} Lumina. All rights reserved.
        </p>
      </div>
    </div>
  `;

  try {
    // Send to Admin
    await transporter.sendMail({
      from: `"Lumina Concierge" <${emailUser}>`,
      to: "devhansjtf@gmail.com",
      subject: `New Inquiry: ${data.subject}`,
      html: adminEmailHtml,
    });

    // Send to Customer
    await transporter.sendMail({
      from: `"Lumina Concierge" <${emailUser}>`,
      to: data.email,
      subject: "We've received your inquiry - Lumina",
      html: customerEmailHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send email via Nodemailer", error);
    throw new Error(error.message || "Failed to send email");
  }
}
