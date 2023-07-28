const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 8008;

const callURLForNumbers = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const data = response.data;
      return data.numbers || [];
    }
  } catch (error) {
    console.error(`Getting Error while fetching the numbers from ${url}:`, error.message);
  }
  return [];
};

const generateFinalResponse = async (urls) => {
  const uniqueNumbers = new Set();

  try {
    const fetchPromises = urls.map(callURLForNumbers);
    const numbersArrays = await Promise.all(fetchPromises);

    numbersArrays.forEach((numbers) => {
      numbers.forEach((number) => uniqueNumbers.add(number));
    });
  } catch (error) {
    console.error("Error while merging the numbers:", error.message);
  }

  return Array.from(uniqueNumbers).sort((a, b) => a - b);
};

app.get("/numbers", async (req, res) => {
  const urls = req.query.url;
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: "Invalid or empty 'url' parameter. please check and Try Again." });
  }

  const mergedNumbers = await generateFinalResponse(urls);
  return res.json({ numbers: mergedNumbers });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
