import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Gold-Store API is running',
  });
});

app.get('/api/rates', (req, res) => {
  const goldPerGramAed = 500.50;
  const silverPerGramAed = 6.12;

  res.json({
    success: true,
    base: 'AED',
    rates: {
      gold_g_aed: goldPerGramAed,
      silver_g_aed: silverPerGramAed,
    },
    message: 'Sample rates; not live market prices',
  });
});

app.listen(PORT, () => {
  console.log(`Gold-Store API running on port ${PORT}`);
});
