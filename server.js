require('dotenv').config();
const express = require('express');
const { callLLM } = require('./tools');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/run', async (req, res) => {
  const { tasks } = req.body;
  const results = [];
  for (const task of tasks) {
    const result = await callLLM(task.input || task.desc);
    results.push(`[${task.desc}] ${result}`);
  }
  res.json({ results });
});

app.listen(3000, () => {
  console.log('Serveur MyCrew sur http://localhost:3000');
});