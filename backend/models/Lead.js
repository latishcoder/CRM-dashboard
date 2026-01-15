import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    stage: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Proposal",
        "Negotiation",
        "Converted",
        "Lost",
      ],
      default: "New",
    },
    source: {
      type: String,
      enum: [
        "Website",
        "Referral",
        "LinkedIn",
        "Cold Call",
        "Email Campaign",
        "Trade Show",
      ],
    },
    value: Number,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
