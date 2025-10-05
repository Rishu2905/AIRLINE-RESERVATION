import React, { useState } from 'react';
import axios from 'axios';

function Bookflight(){
    const [firstname,setfirstName]=useState("");
    const [lastname,setlastName]=useState("");
    const [email,setEmail]=useState("");
    const [number,setNumber]=useState("");
    const [message,setMessage]=useState("");


    const addData =() =>{
        try{
        axios.post('http://localhost:5000/api/flightbookings/',
            {firstname,lastname,email,number}
            
        )
        console.log('added successfully');}
        
        catch (err){
            console.error('couldnt book',err);
        }
    }


 return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Book Your Flight</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          width: "300px",
          margin: "20px auto",
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setfirstName(e.target.value)}
          style={{ padding: "10px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setlastName(e.target.value)}
          style={{ padding: "10px", width: "100%" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "100%" }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          style={{ padding: "10px", width: "100%" }}
        />

        <button
          onClick={addData}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Book Flight
        </button>

        {message && <p style={{ marginTop: "10px", color: "gray" }}>{message}</p>}
      </div>
    </div>
  );
}

export default Bookflight;