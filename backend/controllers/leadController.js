import Lead from "../models/Lead.js";

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().limit(1000);
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
