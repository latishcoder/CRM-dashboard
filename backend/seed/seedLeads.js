import mongoose from "mongoose";
import dotenv from "dotenv";
import Lead from "../models/Lead.js";

dotenv.config();

const stages = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Converted",
  "Lost",
];

const sources = [
  "Website",
  "Referral",
  "LinkedIn",
  "Cold Call",
  "Email Campaign",
  "Trade Show",
];

const companies = [
  "Tech Corp",
  "Digital Solutions",
  "Startup Hub",
  "Global Systems",
  "Innovate Ltd",
  "Future Tech",
];

const generateLeads = (count = 500) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Lead ${i + 1}`,
    email: `lead${i + 1}@mail.com`,
    phone: `+1-555-${Math.floor(100000 + Math.random() * 900000)}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    stage: stages[Math.floor(Math.random() * stages.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    value: Math.floor(Math.random() * 90000) + 5000,
    notes: "Interested in CRM solution",
  }));
};

const seedLeads = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Lead.deleteMany();

    const leads = generateLeads(500); // 👈 change to 300–1000
    await Lead.insertMany(leads);

    console.log(`✅ Seeded ${leads.length} leads`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedLeads();
