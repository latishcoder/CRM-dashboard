const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://mini-crm-frontend.onrender.com"
  ]
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    await seedLeadsIfEmpty(); // 🔥 AUTO SEED
  })
  .catch(err => console.error('❌ MongoDB Error:', err));

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  stage: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Converted', 'Lost'],
    default: 'New'
  },
  source: String,
  value: { type: Number, default: 0 },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

 /* ------------------------------------------------------------------ */
 /* 🔥 DUMMY DATA SEEDER (300–1000 LEADS)                                */
 /* ------------------------------------------------------------------ */

const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Converted', 'Lost'];
const sources = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Trade Show'];
const companies = ['Tech Corp', 'Digital Solutions', 'Startup Hub', 'Future Systems', 'Innovate Ltd'];

const generateLeads = (count = 500) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Lead ${i + 1}`,
    email: `lead${i + 1}@mail.com`,
    phone: `+1-555-${Math.floor(100000 + Math.random() * 900000)}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    stage: stages[Math.floor(Math.random() * stages.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    value: Math.floor(Math.random() * 90000) + 5000,
    notes: 'Interested in CRM solution'
  }));
};

const seedLeadsIfEmpty = async () => {
  const count = await Lead.countDocuments();
  if (count === 0) {
    const leads = generateLeads(500); // 👈 change 300–1000 if needed
    await Lead.insertMany(leads);
    console.log(`🌱 Seeded ${leads.length} dummy leads`);
  } else {
    console.log(`ℹ️ Leads already exist (${count})`);
  }
};

 /* ------------------------------------------------------------------ */
 /* ROUTES                                                             */
 /* ------------------------------------------------------------------ */

// GET /api/leads - search, filter, sort, pagination
app.get("/", (req, res) => {
  res.send("🚀 Mini CRM Backend is running");
});

app.get('/api/leads', async (req, res) => {
  try {
    const {
      search,
      stage,
      source,
      sortField = 'createdAt',
      sortOrder = '-1',
      page = 1,
      limit = 10
    } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    if (stage) query.stage = stage;
    if (source) query.source = source;

    const leads = await Lead.find(query)
      .sort({ [sortField]: parseInt(sortOrder) })
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    const total = await Lead.countDocuments(query);

    res.json({
      leads,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/leads/:id
app.get('/api/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/analytics
app.get('/api/analytics', async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const converted = await Lead.countDocuments({ stage: 'Converted' });
    const qualified = await Lead.countDocuments({ stage: 'Qualified' });

    const revenueAgg = await Lead.aggregate([
      { $match: { stage: 'Converted' } },
      { $group: { _id: null, total: { $sum: '$value' } } }
    ]);

    res.json({
      total,
      converted,
      qualified,
      revenue: revenueAgg[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'demo@crm.com' && password === 'demo123') {
    res.json({
      user: { email, name: 'Demo User' },
      token: 'demo-token'
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
