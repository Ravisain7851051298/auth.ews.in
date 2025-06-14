const mongoose = require("mongoose");
const PasswordResetSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },  // Track request attempts
    lastRequest: { type: Date, default: null }, // Last request timestamp
  });
  
  module.exports = mongoose.model("PasswordReset", PasswordResetSchema);
  