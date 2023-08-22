const express = require("express");
const app = express();
const axios = require('axios')
const PORT = process.env.PORT || 8080;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url || [];

    const urlNumber = Array.isArray(urls) ? urls : [urls];
  
    const fetchData = urlNumber.map(async (url) => {
      try {
        const res = await axios.get(url, { timeout: 500 });
        return res.data.numbers || [];
      } catch (error) {
        return [];
      }
    });

  try {
    const results = await Promise.all(fetchData);
    const mergedNumbers = Array.from(new Set(results.flat())).sort((a, b) => a - b);
    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
});




app.listen(PORT,() =>{
    console.log(`LIVE ON port ${PORT}`);
})