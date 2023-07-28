import React, { useState } from "react";
import axios from "axios";
import { Button ,Card,CardBody, CardTitle,CardText} from 'reactstrap';

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
    <>

<Card className="my-2" color="secondary">
  <CardBody>
    <CardTitle tag="h5">
    Get Numbers
    </CardTitle>
    <CardText>
    Enter the URLs (one per line without comma) to fetch numbers from and click "Enter":
    </CardText>
    <textarea
        rows={5}
        cols={40}
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <br />
      <Button color="danger" onClick={handleFetchNumbers}>Enter</Button>
      <Card className="my-2 colot" color="info">
      <h2 >Response:</h2>
      <ul>
        {mergedNumbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
      </Card>
  </CardBody>
</Card>
</>
  );
}

export default App;
