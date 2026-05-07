const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Supabase Setup ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url_here') {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Connected to Supabase Database');
} else {
  console.warn('⚠️ Supabase credentials missing. Please check your .env file.');
}

// Middleware
app.use(cors());
app.use(express.json());

// --- Routes ---

// GET / - Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Complaint API (Supabase Ready) is running',
  });
});

// GET /complaints - Fetch all from Supabase
app.get('/complaints', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ success: false, message: 'Supabase not configured' });
  }

  try {
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching from Supabase:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /complaints - Insert into Supabase
app.post('/complaints', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ success: false, message: 'Supabase not configured' });
  }

  const { name, city, mobile, complaint } = req.body;

  if (!name || !city || !mobile || !complaint) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    const { data, error } = await supabase
      .from('complaints')
      .insert([
        { 
          name: name.trim(), 
          city: city.trim(), 
          mobile: mobile.trim(), 
          complaint: complaint.trim()
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Complaint saved to Supabase',
      data: data[0],
    });
  } catch (error) {
    console.error('Error inserting into Supabase:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Backend running at http://localhost:${PORT}`);
  if (supabase) {
    console.log(`☁️ Syncing with Supabase table: 'complaints'\n`);
  } else {
    console.log(`❗ Action Required: Update your .env file with Supabase keys!\n`);
  }
});
