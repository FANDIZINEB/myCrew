require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

async function callLLM(prompt) {
  const response = await fetch(process.env.LLM_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.LLM_MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    }),
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

async function fetchURL(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text.slice(0, 1000);
}

async function getWeather(city) {
  const url = `https://wttr.in/${city}?format=3`;
  const response = await fetch(url);
  return await response.text();
}

function writeFile(filename, content) {
  fs.writeFileSync(filename, content, 'utf8');
  return `Fichier ${filename} écrit avec succès !`;
}

module.exports = { callLLM, fetchURL, getWeather, writeFile };