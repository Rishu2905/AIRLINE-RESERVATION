import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookingstatus(){
    const [bookingdata,setBookingdata]=useState(null);
    const [bookingid,setBookingid]=useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    

    const handleSearch = ()=>{
        setBookingdata(null);
        setLoading(true); 
        setError(false); 
        // setBookingid(null);
        
        try{
        axios.get(`http://localhost:5000/api/booking-status/${bookingid}`)
        .then(response=>{
            // console.log("req processed",response.data)
            if (response.data.length>0){
                setBookingdata(response.data);
                // setBookingid(null);
            }
            else{setError(true); setBookingdata(null); //setBookingid(null);

            }
            setLoading(false);
    })}
    catch (err){
        setLoading(false);
        setError(true);
        console.error('error fetching flight',err);
        // setBookingid(null);
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
          <div style={{ textAlign: "center", marginTop: "20px" }}>
        {loading && <p>Loading booking info...</p>}
        {error && <p>Booking not found.</p>}
        {bookingdata && <pre>{JSON.stringify(bookingdata, null, 2)}</pre>}
      </div>
          </div>
);}
export default Bookingstatus;