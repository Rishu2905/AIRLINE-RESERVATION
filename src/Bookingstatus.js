import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookingstatus(){
    const [bookingdata,setBookingdata]=useState(null);
    const [bookingid,setBookingid]=useState(null);
    

    const handleSearch = ()=>{
        setBookingdata(null);
        setBookingid(null);
        
        try{
        axios.get(`http://localhost:5000/api/booking/${bookingid}`)
        .then(response=>{
            if (response.length>0){
                setBookingdata(response);
            }
            else{setBookingdata(null);}
    })}
    catch (err){
        console.error('error fetching flight',err);
    }
    }

return (
    <div>
        <input
            type="text"
            placeholder="Booking ID"
            value={bookingid}
            onChange={(e) => setBookingid(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              minWidth: "120px",
              textAlign: "center",
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
);}
export default Bookingstatus;