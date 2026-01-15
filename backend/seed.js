const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  stage: String,
  source: String,
  value: Number,
  notes: String,
  createdAt: Date
});

const Lead = mongoose.model('Lead', leadSchema);

const stages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Converted', 'Lost'];
const sources = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Trade Show', 'Google Ads'];
const companies = [
  'TechCorp', 'Innovate Ltd', 'Digital Solutions', 'Global Enterprises', 'StartUp Inc',
  'Future Systems', 'DataFlow Inc', 'CloudNine Tech', 'Apex Industries', 'Prime Ventures',
  'NextGen Solutions', 'BlueSky Corp', 'RedRock Technologies', 'GreenField Systems',
  'SilverLine Inc', 'GoldStar Enterprises', 'Diamond Tech', 'PeakPerformance Ltd'
];

const firstNames = [
  'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Jessica',
  'William', 'Ashley', 'James', 'Emma', 'Richard', 'Olivia', 'Joseph', 'Sophia',
  'Thomas', 'Isabella', 'Charles', 'Mia', 'Daniel', 'Charlotte', 'Matthew', 'Amelia'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris'
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    await Lead.deleteMany({});
    console.log('🗑️  Cleared existing leads');
    
    // Generate 1000 leads
    const leads = [];
    for (let i = 0; i < 1000; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
      
      leads.push({
        name,
        email,
        phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        company: companies[Math.floor(Math.random() * companies.length)],
        stage: stages[Math.floor(Math.random() * stages.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        value: Math.floor(Math.random() * 150000) + 5000,
        notes: 'Generated lead - interested in our services',
        createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000)
      });
    }
    
    await Lead.insertMany(leads);
    console.log(`✅ Seeded ${leads.length} leads successfully`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
```

// **4. `.env`**
// ```
// MONGODB_URI="mongodb+srv://latishsalunkhe8_db_user:latishsalunkhe8_db_user@cluster0.s7wygul.mongodb.net/?appName=Cluster0"
// PORT=5000
// ```

// **5. `.gitignore`**
// ```
// node_modules
// .env
// .DS_Store