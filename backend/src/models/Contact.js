import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    preferredLanguage: { type: String, default: "fr" },
    source: { type: String, default: "web" },
    status: { type: String, enum: ["pending", "synced", "error"], default: "pending" },
    zohoId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
