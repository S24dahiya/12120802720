import React, { useState } from "react";
import axios from "axios";

function App() {
  const [urls, setUrls] = useState("");
  const [mergedNumbers, setMergedNumbers] = useState([]);

  const handleFetchNumbers = async () => {
    const urlList = urls.split("\n").filter((url) => url.trim() !== "");

    try {
      const response = await axios.get("http://localhost:8008/numbers", {
        params: {
          url: urlList,
        },
      });

      setMergedNumbers(response.data.numbers);
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  return (
    <div>
      <h1>Number Management App</h1>
      <p>
        Enter the URLs (one per line) to fetch numbers from and click "Fetch
        Numbers":
      </p>
      <textarea
        rows={5}
        cols={40}
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <br />
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>

      <h2>Merged Unique Numbers</h2>
      <ul>
        {mergedNumbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
