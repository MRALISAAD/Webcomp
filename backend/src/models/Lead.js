import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    pack: { type: String },
    message: { type: String },
    locale: { type: String, default: "fr" },
    source: { type: String, default: "website" },
    status: { type: String, enum: ["pending", "synced", "error"], default: "pending" },
    zohoId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
