import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightSearchPage from "./FlightSearchPage";
import Flightdetails from "./Flightdetails";
import Bookingstatus from "./Bookingstatus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightSearchPage />} />
        <Route path="/login" element={<h2>Login Page</h2>} />
        <Route path="/signup" element={<h2>Signup Page</h2>} />
        <Route path = "/booking-status" element={<h2><Bookingstatus /></h2>} />
        <Route path="/flightdetails" element={<Flightdetails /> } /> 
        {/* <Flightdetails /> */}
      </Routes>
    </Router>
  );
}

export default App;
