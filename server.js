const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json()); // هذا السطر يسمح للسيرفر بقراءة البيانات القادمة

const pool = new Pool({
  connectionString: 'postgresql://postgres.vofgmoasbbyfcnpbywex:EcoTechDZ2026@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

// مسار لإضافة نوع نفايات جديد
app.post('/add-waste-type', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query('INSERT INTO waste_types (name) VALUES ($1) RETURNING *', [name]);
    res.json({ message: '✅ تم إضافة نوع النفايات بنجاح!', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('🚀 السيرفر يعمل على المنفذ 5000')); 
