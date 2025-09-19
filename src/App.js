import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightSearchPage from "./FlightSearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightSearchPage />} />
        <Route path="/login" element={<h2>Login Page</h2>} />
        <Route path="/signup" element={<h2>Signup Page</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
