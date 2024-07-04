import { Grid, Box, useMediaQuery,useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setId, setallUser } from "../Reducers/UiReducer";
// import config from "../config";
// import env from "/"
import axios from "axios";
// import { useTheme } from "@emotion/react";

const LoginForm = () => {
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const backendUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async () => {
    // e.preventDefault();
    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);

    try {
      const response = await fetch(
        `${backendUrl}/login.php`,
        // "http://localhost/chatting-app-php-react/backend/login.php",
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        
        const responseData = await response.json();
        console.log("responseDatalogin", responseData.id);

        sessionStorage.setItem("userData", JSON.stringify(responseData));

        const storedUserData = JSON.parse(sessionStorage.getItem("userData"));

        dispatch(setId(responseData.id));
        // console.log("responseDatalogin", responseData.status);

        // navigate("/dashboard");
        if (responseData.status == "0") {
          navigate("/chat/dashboard");
        } else {
          alert("You are block by admin");
        }
      
      } else {
        setError("Invalid User");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
      setError("Please Enter Valid Information");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/getallusers.php`
          // 'http://localhost/chatting-app-php-react/backend/getallusers.php'
        );
        dispatch(setallUser(response.data));
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
    <Grid style={{ backgroundColor: "#e4e4e4", height: "100vh" }} container>
                <Grid style={{padding: sm ? "80px 0px" : "40px 0px"}} item lg={6} md={6} sm={10} xs={10} mx="auto">
                   
                <Grid mx="auto" style={{}} item lg={6} md={12} sm={12} xs={12}>

<Box mt={5} style={{display: "flex", justifyContent: "center", padding: sm ? "0px 50px" : "0px 0px",background: "white", boxShadow: "0 0 5px"}}>

<Box  style={{padding: sm ? "30px 0px" : "50px 0px", textAlign: "center"}}>
<Box mb={5}><img style={{width: "150px"}}     src="https://atypicalsoftware.com/images/logo.png" alt="" />

</Box>
 <Box style={{marginTop: sm ? "70px" : "0px"}} mt={1}> <h3>  Sign In  </h3> </Box>
 <Box style={{fontSize: "14px"}}>User Login Panel</Box>
 <Box  mt={1}><input   onChange={(e) =>
setFormData({ ...formData, username: e.target.value })
}
value={formData.username} style={{padding: "7px 15px", width: "250px", border: "none", outline:"none", background: "#eeeeee", borderRadius: "8px", fontSize: "14px"}} type="text" placeholder='Username'/></Box>


 <Box  mt={2}><input onKeyDown={handleKeyDown} onChange={(e) =>
setFormData({ ...formData, password: e.target.value })
}
value={formData.password} style={{padding: "7px 15px", width: "250px", border: "none", outline:"none", background: "#eeeeee", borderRadius: "8px", fontSize: "14px"}} type="password" placeholder='Password'/></Box>


 <Box style={{display: "flex", justifyContent: "center"}}>

<Box mt={3}    onClick={() => {
handleSubmit();

}} style={{background: "blue", color: "white", background: "#1b2295", padding: "8px 50px", borderRadius: "8px", fontWeight: "600", fontSize: "13px", cursor: "pointer"}}>Login</Box>
 </Box>

 <Box mt={2} style={{fontSize: "14px"}}>Forget Password ?</Box>

</Box>
</Box>
</Grid>
             
                </Grid>

            </Grid>
      {/* <Grid
        style={{
          
          backgroundSize: "100%",
         
          height: "100vh",
        }}
        container
      >
        <Grid
          style={{
            marginTop: "25px",
            padding: "20px",
            color: "white",
            boxShadow: "0 0 5px",
          }}
          item
          lg={5}
          mx="auto"
        >
          <Box>
            <Box mt={5}>
              <h3> User Login Form</h3>
            </Box>
            <Box mt={2}>
              <h5>UserName</h5>
            </Box>
            <Box onClick={() => setError("")}>
              <input
                className="form-control"
                placeholder="Enter your username"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                value={formData.username}
              />
            </Box>
            <Box mt={2}>
              <h5>Password</h5>
            </Box>
            <Box>
              <input
                className="form-control"
                placeholder="Enter your Password"
                type="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
            </Box>
            <Box
              onClick={() => {
                handleSubmit();
              }}
              mt={2}
              style={{ textAlign: "center", cursor: "pointer" }}
              className="form-control btn-dark"
            >
              Submit
            </Box>
            {error && <Box style={{ color: "red" }}>{error}</Box>}
    
          </Box>
        </Grid>
        <Grid item lg={6} mx="auto">
          <Box mt={3}>
           
          </Box>
        </Grid>
      </Grid> */}
    </>
  );
};

export default LoginForm;
