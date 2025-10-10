import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Flightdetails() {
  const [flightData, setFlightData] = useState(null);
  const [flightNo,setflightNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = () =>{
    setLoading(true); 
    setFlightData(null);
    setError(false); 

    axios.get(`http://localhost:5000/api/flight/${flightNo}`) // sending a get request which is recieved by server.js using .get
      .then(response => {
        if (response.data){
        setFlightData(response.data);
        }
        else {
          setError(true);
        } 
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        console.error('No data', error);
        
      });
    ;}

  return (
    // frontend for user input flight number
    // create a search button to prevent flooding of backend from frontend requests
    <div> 
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
            <input
            type="text"
            placeholder="Enter Flight Number"
            value={flightNo}
            onChange={(e) => setflightNo(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              minWidth: "120px",
              textAlign: "center",
            }}
          />
          <button className="Searchbutton" onClick={(handleSearch)}>search</button>
        </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {loading && <p>Loading flight info...</p>}
        {error && <p>Flight not found.</p>}
        {flightData && <pre>{JSON.stringify(flightData, null, 2)}</pre>}
      </div>
    </div>

    

    // this api call will go to the backend page where backend will hit another trigger to the database with querry written in it
  );
}

export default Flightdetails;
