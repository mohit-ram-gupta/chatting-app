import { Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setId, setallUser } from "../Reducers/UiReducer";
import config from "../config";
import axios from "axios";

const AdminLogin = () => {
  const backendUrl = process.env.REACT_APP_ADMIN_URL;
  const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);

    try {
      const response = await fetch(
         `${backendUrl}/adminlogin.php`,
        {
          method: "POST",
          body: form,
          credentials: "include",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        sessionStorage.setItem("adminData", JSON.stringify(responseData));

        const storedAdminData = JSON.parse(sessionStorage.getItem("adminData"));
        dispatch(setId(storedAdminData.id));
        console.log("responseAdminlogin", responseData.status);
        navigate("/chat/admin");
      } else {
        setError("Invalid User");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
      setError("Please Enter Valid Information");
    }
  };

  const handleForget = async () => {


     const form = new FormData();
     form.append("username", formData.username);
    // form.append("password", formData.password);
     form.append("email", formData.email);
    
     try {
       const response = await fetch(
         "http://localhost/chatting-app-php-react/adminbackend/send_email.php",
         // `${backendUrl}/adminlogin.php`,
         {
           method: "POST",
           body: form,
           credentials: "include",
         }
       );

       if (response.ok) {
           setError("valid User");
       } else {
         setError("Invalid User");
       }
     } catch (error) {
       console.error("An error occurred while logging", error);
       setError("Please Enter Valid Information");
     }


  }

   const handleKeyDown = (e) => {
     if (e.key === "Enter") {
       handleSubmit(e);
     }
   };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${config.REACT_APP_BACKEND_URL}/getallusers.php`
  //         );
  //         dispatch(setallUser(response.data));
  //         console.log(response.data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  return (
    <>
      <Grid style={{ backgroundColor: "#e4e4e4", height: "100vh" }} container>
        <Grid
          style={{ padding: sm ? "80px 0px" : "40px 0px" }}
          item
          lg={6}
          md={6}
          sm={10}
          xs={10}
          mx="auto"
        >
          <Grid mx="auto" style={{}} item lg={6} md={12} sm={12} xs={12}>
            <Box
              mt={5}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: sm ? "0px 50px" : "0px 0px",
                background: "white",
                boxShadow: "0 0 5px",
              }}
            >
              <Box
                style={{
                  padding: sm ? "30px 0px" : "50px 0px",
                  textAlign: "center",
                }}
              >
                <Box mb={5}>
                  <img
                    style={{ width: "150px" }}
                    src="https://atypicalsoftware.com/images/logo.png"
                    alt=""
                  />
                </Box>
                <Box style={{ marginTop: sm ? "70px" : "0px" }} mt={1}>
                  {" "}
                  <h3> Sign In </h3>{" "}
                </Box>
                <Box style={{ fontSize: "14px" }}>Admin Login Panel</Box>
                <Box mt={1}>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    value={formData.username}
                    style={{
                      padding: "7px 15px",
                      width: "250px",
                      border: "none",
                      outline: "none",
                      background: "#eeeeee",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                    type="text"
                    placeholder="Username"
                  />
                </Box>

                <Box mt={2}>
                  <input
                    onKeyDown={handleKeyDown}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    value={formData.password}
                    style={{
                      padding: "7px 15px",
                      width: "250px",
                      border: "none",
                      outline: "none",
                      background: "#eeeeee",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                    type="password"
                    placeholder="Password"
                  />
                </Box>

                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    mt={3}
                    onClick={() => {
                      handleSubmit();
                    }}
                    style={{
                      background: "blue",
                      color: "white",
                      background: "#1b2295",
                      padding: "8px 50px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </Box>
                </Box>

                {/* <Box mt={2} style={{ fontSize: "14px", cursor: "pointer" }}>
                  Forget Password ?
                </Box> */}

                {/* <Box style={{position: "absolute", zIndex: 55, background: "grey", padding: "50px"}}>
                  <h5> Forget Password </h5>
                </Box> */}

                <Box
                  mt={1}
                  style={{ fontSize: "14px", cursor: "pointer" }}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Forget Password ?
                </Box>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Verify Username
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {/* <Box>Enter Username</Box> */}
                        <Box>
                          <input
                            type="text"
                            placeholder="Enter Username"
                            className="form-control"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                username: e.target.value,
                              })
                            }
                            value={formData.username}
                          />
                        </Box>

                        {/* <Box>Enter Email</Box> */}
                        <Box mt={2}>
                          <input
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            value={formData.email}
                            type="text"
                            placeholder="Enter Email"
                            className="form-control"
                          />
                        </Box>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleForget}
                          type="button"
                          className="btn btn-primary"
                        >
                          Verfify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid
        style={{
          background: `url(https://media.istockphoto.com/id/1150041986/photo/logging-in-to-account.jpg?s=1024x1024&w=is&k=20&c=tARb9ddLAVb93PNiCms6lbUJ1ftm3Q2-MAXoDNKuFBg=)`,
          backgroundSize: "cover",
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
              <h3> Admin Login Form</h3>
            </Box>
            <Box mt={2}>
              <h5>UserName</h5>
            </Box>
            <Box onClick={() => setError("")}>
              <input
                className="form-control"
                placeholder="Enter your Email"
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
      
      </Grid> */}
    </>
  );
};

export default AdminLogin;
