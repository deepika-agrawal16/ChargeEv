import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ChargeEV Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(` Email sent successfully to ${to}`);
  } catch (error) {
    console.error(" Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
