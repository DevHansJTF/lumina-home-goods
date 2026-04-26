"use server";

import nodemailer from "nodemailer";

export async function processCheckout(data: any) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn(
      "EMAIL_USER or EMAIL_PASS is missing. Simulating email send. To send real emails, provide your Gmail credentials.",
    );
    return { success: true, warning: "Credentials missing. Order processed but no email sent." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const adminEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #141414;">
      <h1 style="border-bottom: 1px solid #EAEAEA; padding-bottom: 20px;">New Order Received</h1>
      <p><strong>Customer Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Address:</strong> ${data.address}, ${data.city}, ${data.zip}</p>
      
      <h2 style="margin-top: 30px;">Order Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid #EAEAEA;">
            <th style="padding: 10px 0;">Item</th>
            <th style="padding: 10px 0;">Qty</th>
            <th style="padding: 10px 0;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${data.cart
            .map(
              (item: any) => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #FAFAFA;">${item.name}</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #FAFAFA;">${item.quantity}</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #FAFAFA;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
      <div style="margin-top: 20px; font-size: 1.25em;">
        <strong>Total: $${parseFloat(data.total).toFixed(2)}</strong>
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
          Thank you for choosing Lumina. We are delighted to confirm that we have received your order request.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          Our concierge team is currently reviewing your selection. We will reach out to you shortly regarding the updated pricing for your preferred products, which will include applicable taxes and delivery fees tailored to your provided location in ${data.city}.
        </p>
        
        <div style="margin: 40px 0; border-top: 1px solid #EAEAEA; border-bottom: 1px solid #EAEAEA; padding: 20px 0;">
          <h2 style="font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; color: #141414;">Your Curation</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              ${data.cart
                .map(
                  (item: any) => `
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; color: #555;">${item.name} <span style="color: #888; font-size: 12px;">(x${item.quantity})</span></td>
                  <td style="padding: 10px 0; font-size: 14px; color: #555; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
          <div style="text-align: right; margin-top: 15px; font-size: 16px; color: #141414;">
            <strong>Subtotal: $${parseFloat(data.total).toFixed(2)}</strong>
          </div>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          Should you have any immediate questions, please do not hesitate to contact us.
        </p>
        
        <p style="font-size: 15px; line-height: 1.6; color: #333; margin-top: 40px;">
          Warm regards,<br>
          <span style="font-style: italic; font-family: 'Times New Roman', Times, serif; font-size: 18px;">The Lumina Furniture Services</span>
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <p style="font-size: 11px; color: #999; line-height: 1.5;">
          You are receiving this email because you submitted an order request at Lumina.<br>
          © ${new Date().getFullYear()} Lumina. All rights reserved.
        </p>
      </div>
    </div>
  `;

  try {
    // Send to Admin
    await transporter.sendMail({
      from: `"Lumina Furniture Services" <${emailUser}>`,
      to: "devhansjtf@gmail.com",
      subject: `New Order from ${data.name}`,
      html: adminEmailHtml,
    });

    // Send to Customer
    await transporter.sendMail({
      from: `"Lumina Concierge" <${emailUser}>`,
      to: data.email,
      subject: "Your Lumina Order Request Received",
      html: customerEmailHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send email via Nodemailer", error);
    throw new Error(error.message || "Failed to send email");
  }
}
