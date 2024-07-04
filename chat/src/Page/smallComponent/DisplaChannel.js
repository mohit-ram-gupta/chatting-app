import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DisplaChannel = () => {
    const [channel, setChannel] = useState(null);

    const handleGetChannel = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost/chatting-app-php-react/backend/getallgroup.php',
        });
        setChannel(response.data);
        console.log("bunty", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
   
  return (
 <>
 <Box>fdbx 
 </Box>


{/* <Box>
 {Array.isArray(channel.data) 
                .map((item, i) => (
                  <Box
                    key={i}
                    onClick={async () => {
                    
                    }}
                    style={{
                      cursor: "pointer",
                    
                      padding: "5px",
                     
                      color: "white",

                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    mt={3}
                  >
                    <Box style={{ display: "flex" }}>
                      <Box style={{ 
                     
                        color: "white"
                       }} mr={2}>
                        <img style={{borderRadius: "18px", width: "30px", height: "30px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpX6V5vW3sw6xZd0OojjdzPVBNQxZOR8iqALSVhkCtmGXsgW9IDx6o2MFEZAsMlTx0BQ&usqp=CAU" alt="" />
                   
                      </Box>
                      <Box>
                   
                        <h5>Bunty</h5>

                      </Box>
                      
                    </Box>

            
                  </Box>
                ))}
                </Box> */}
 </>
  )
}

export default DisplaChannel