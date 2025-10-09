import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightSearchPage from "./FlightSearchPage";
import Flightdetails from "./Flightdetails";
import Bookingstatus from "./Bookingstatus";
import Bookflight from "./Bookflight";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightSearchPage />} />
        <Route path="/login" element={<h2>Login Page</h2>} />
        <Route path="/signup" element={<h2>Signup Page</h2>} />
        <Route path = "/booking-status" element={<Bookingstatus />} />
        <Route path="/flightdetails" element={<Flightdetails /> } /> 
        <Route path="/bookflight/:flightNumber" element={<Bookflight />} />
        {/* <Flightdetails /> */}
      </Routes>
    </Router>
  );
}

export default App;
