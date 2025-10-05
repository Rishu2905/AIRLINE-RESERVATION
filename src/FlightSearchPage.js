// src/FlightSearchPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FlightSearchPage.css";
import axios from "axios";
import "./App.css";


function reverseDate(date){
  const parts = date.split('-'); // Splits into ["yyyy", "mm", "dd"]
  const reversedParts = parts.reverse(); // Reverses to ["dd", "mm", "yyyy"]
  return reversedParts.join('-');
}
function parseTimeString(timeString) {
  // Expecting input like "08:00:00"
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  // Create a new Date with today's date
  const date = new Date();
  date.setHours(hours, minutes, seconds, 0);

  return date;
}
function fixISTTime(wrongDate) {
  // wrongDate is a JS Date object that has been shifted incorrectly
  // add back the IST offset (5h30m)
  const newdate=parseTimeString(wrongDate);
  const corrected = new Date(newdate.getTime() + (5.5 * 60 * 60 * 1000));
  return corrected.toLocaleTimeString();
}
function FlightSearchPage() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);

  // Swap origin & destination
  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  // Search flights action
  const handleSearch = async () => {
    setFlights([]);
    if (!from || !to || !date){
      setFlights([]);
      return 
    }
    try {
      
      const response = await axios.get(`http://localhost:5000/api/flight/${from}/${to}/${date}`);
      if (response.data.length>0)
        {
      setFlights(response.data);

      // console.log((flights[0]["origin"]).substring(0,4));
      // console.log(response.data);
      }
      else 
      {setFlights([]);}
    }
    catch (err) {
      console.error("Error fetching flights:", err);
    }
    
    
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#e0e0e0",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Your Travel Begins Here...</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="Mainbuttons" onClick={() => navigate("/login")}>Login</button>
          <button className="Signupbutton" onClick={() => navigate("/signup")}>Sign up</button>
          <button className="Mainbuttons" onClick={() => navigate("/booking-status")}>Booking Status</button>
          <button className="Mainbuttons" onClick={() => navigate("/flightdetails")}>Flight Details</button>
          
        </div>
      </header>

      {/* Search Section */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <h3>Search Flights</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              minWidth: "120px",
              textAlign: "center",
            }}
          />
          <button
            onClick={swapLocations}
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              border: "1px solid #ccc",
              cursor: "pointer",
              backgroundColor: "#dcdcdc",
            }}
          >
            ⇄
          </button>
          <input
            type="text"
            placeholder="Destination"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              minWidth: "120px",
              textAlign: "center",
            }}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              minWidth: "140px",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#dcdcdc",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            🔍
          </button>
          
        </div>
      </div>

      {/* returning results of search */}
      <div className="resulrcard" style={{ display: "flex", gap: "10px" }}>
  {flights.length > 0 ? (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {flights.map((flight, index) => (
        <li
          key={index}
          style={{
            margin: "15px auto",
            padding: "15px",
            border: "1px solid #000",
            borderRadius: "8px",
            backgroundColor: "#e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {/* Airline details */}
          <div style={{  padding: "15px", minWidth: "120px", textAlign: "center" }}>
            {flight.name || "Airline details"}
          </div>

          {/* Route details */}
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            {/* From + Date */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{  padding: "8px 12px" }}>
                {flight.origin}
              </div>
              <div style={{ padding: "8px 12px", marginTop: "8px" }}>
                {reverseDate(flight.departure_time.substring(0,10))}
              </div>
              <div style={{  padding: "4px 8px", marginTop: "2px" }}>
                {fixISTTime(reverseDate(flight.departure_time.substring(11,19)))}
              </div>
            </div>

            {/* Duration */}
            <div style={{  padding: "8px 12px" }}>
              {flight.duration || "Duration"}
            </div>

            {/* Destination + Date */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{  padding: "8px 12px" }}>
                {flight.destination}
              </div>
              <div style={{  padding: "8px 12px", marginTop: "2px" }}>
                {reverseDate(flight.arrival_time.substring(0,10))}
              </div>
              <div style={{  padding: "4px 8px", marginTop: "2px" }}>
                {fixISTTime(flight.arrival_time.substring(11,19))}
              </div>
            </div>
          </div>

          {/* Price + Book button */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{  padding: "10px 20px" }}>
              ₹{flight.price || "N/A"}
            </div>
            <button
              style={{
                padding: "8px 15px",
                border: "1px solid black",
                borderRadius: "6px",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
              }}
              onClick={() => navigate("/Bookflight")}>Book
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p style={{ color: "gray" }}>
      {from && to && date ? "No flights found" : "Please enter origin destination and date"}
    </p>
  )}
</div>



    </div>
  );
}

export default FlightSearchPage;
