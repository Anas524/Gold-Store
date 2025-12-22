// server/index.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;

// 👉 Static (temporary) gold & silver values
app.get('/api/rates', (req, res) => {
  const goldPerGramAed = 500.50;  // your new approximate gold/g price
  const silverPerGramAed = 6.12;  // your new approximate silver/g price

  res.json({
    success: true,
    base: 'AED',
    rates: {
      gold_g_aed: goldPerGramAed,
      silver_g_aed: silverPerGramAed,
    },
    message: 'Static local rates (no external API)',
  });
});

app.listen(PORT, () => {
  console.log(`Rates server running on http://localhost:${PORT}`);
});
