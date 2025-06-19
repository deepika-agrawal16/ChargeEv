import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmails.js";

// ✅ Forgot Password Controller
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found with this email." });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save hashed token & expiry time to DB
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Send email with reset link
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `
      <h2>ChargeEV Password Reset</h2>
      <p>You have requested to reset your password.</p>
      <p>This link will expire in 15 minutes.</p>
      <a href="${resetURL}" target="_blank" style="padding:10px 20px;background-color:#007bff;color:#fff;border-radius:5px;text-decoration:none;">Reset Password</a>
      <p>If you didn't request this, simply ignore this email.</p>
    `;

    await sendEmail(user.email, "ChargeEV Password Reset", message);
    res.status(200).json({ message: "Reset email sent successfully." });

  } catch (err) {
    console.error("Error sending reset email:", err);
    res.status(500).json({ message: "Server error while sending reset email." });
  }
};

// ✅ Reset Password Controller
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    // Set new password & remove reset token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });

  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Server error while resetting password." });
  }
};
