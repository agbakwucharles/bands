import React, {useState} from "react";
import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";
import ItemCard from "./components/itemCard/itemCard";
import BandForm from "./BandForm";

function App() {

      //if we were pulling data from an API, this is an example where I would set up the state to hold that data.

      // const [bands, setBands] = useState([]);

      // useEffect(() => {
      //   const fetchBands = async () => {
      //     try {
      //       Simulate fetching band data from an API

      //       const response = await fetch('api/bands');
      //       const data = await response.json();
      //       setBands(data);
      //     } catch (error) {
      //       console.error('Error fetching bands:', error);
      //     }
      //   };
      // }, []); 

  const bands = [skaBand, kpopBand, punkBand];
  // I will have my useState as empty for now because initially no band is selected.
  const [selectedBand, setSelectedBand] = useState(); 

  const bandPick = (band) => {
    // setting the selected band
    setSelectedBand(band);
  };

  // If there are no bands loaded, I can show a loading state or a message telling the user that no bands are currently available.
  if (bands.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1>Loading bands</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="flex flex-wrap justify-around pt-5">
      {bands.map((band, index) => (
          <div key={index} className="mb-5">
            {/* I added these cards so that it could simpulate an online store for tickets. */}
            {/* I am going to pass list of bands and the function to select a specific band */}
              <ItemCard band={band} onTicketPurchase={bandPick} /> 
          </div>
        ))}
      </div>

      {/* This component will reflect which band I select from the list. */}
      {/* This could be added to a separate route in a real application, but for simplicity, I will keep it here. */}
      <hr className="my-5 w-3/4 mx-auto border-t-2 border-gray-300" />
      <BandForm band={selectedBand} />
    </div>
  );
}

export default App;
