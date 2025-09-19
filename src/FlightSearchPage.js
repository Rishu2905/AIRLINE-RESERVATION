// src/FlightSearchPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FlightSearchPage.css";

function FlightSearchPage() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  // Swap origin & destination
  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  // Search flights action
  const handleSearch = () => {
    alert(`Searching flights from ${from} to ${to} on ${date}`);
    // TODO: Replace with your API call
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
          <button className="Mainbuttons" onClick={() => navigate("/flight-details")}>Flight Details</button>
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
    </div>
  );
}

export default FlightSearchPage;
