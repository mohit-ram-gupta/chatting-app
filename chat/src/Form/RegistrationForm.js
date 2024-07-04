import React, { useState } from "react";
import { Box, Grid, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const RegistrationForm = () => {

  const backendUrl = process.env.REACT_APP_API_URL;

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
  });
  const [registerOpen, setRegisterOpen] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddUser = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("phone", formData.phone);
    form.append("dob", formData.dob);

    try {
      const response = await fetch(
        `${backendUrl}/registration.php`,
        {
          method: "POST",
          body: form,
        }
      );

      if (response.ok) {
        alert("Registration Successful");
        handleRegisterClose(); // Close the modal after successful registration
      } else {
        setError("Invalid User");
      }
    } catch (error) {
      console.error("An error occurred while registering", error);
      setError("Please Enter Valid Information");
    }
  };

  return (
    <Box mt={1} ml={-0.5}>
      <Button
        style={{ color: "black", textTransform: "uppercase" }}
        onClick={handleRegisterOpen}
      >
        <Box ml={2} mt={0}>
          <button className="btn btn-primary">Add User</button>
        </Box>
      </Button>
      <Modal
        open={registerOpen}
        onClose={handleRegisterClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{ borderRadius: "8px" }} sx={style}>
          <Grid container>
            <Grid
              style={{
                background: "white",
                marginTop: "20px",
                borderRadius: "8px",
              }}
              item
              lg={12}
              mx="auto"
            >
              <Grid container>
                <Grid item lg={5}>
                  <Box>
                    <img
                      src="https://stimg.cardekho.com/pwa/img/my-account/pic/login-banner.svg"
                      alt=""
                    />
                  </Box>
                </Grid>
                <Grid style={{ padding: "10px" }} item lg={7}>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  ></Box>
                  <Box>
                    <h2>User Register</h2>
                  </Box>
                  <Box style={{ color: "grey" }}>
                    for Better Experience, Order tracking & Regular updates
                  </Box>
                  <Box mt={1}>
                    <input
                      style={{
                        width: "80%",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </Box>
                  <Box mt={1}>
                    <input
                      style={{
                        width: "80%",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </Box>
                  <Box mt={1}>
                    <input
                      style={{
                        width: "80%",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </Box>
                  <Box mt={1}>
                    <input
                      style={{
                        width: "80%",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                      className="form-control"
                      name="phone"
                      placeholder="Phone No"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </Box>
                  <Box mt={1}>
                    <input
                      style={{
                        width: "80%",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                      className="form-control"
                      name="dob"
                      placeholder="Date of Birth"
                      value={formData.dob}
                      onChange={handleInputChange}
                      type="date"
                    />
                  </Box>
                  <Box
                    mt={4}
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      width: "80%",
                      padding: "10px",
                      borderRadius: "8px",
                      color: "white",
                      background: "rgb(36, 39, 44)",
                      cursor: "pointer",
                    }}
                    className="form-control"
                    onClick={handleAddUser}
                  >
                    {" "}
                    Submit
                  </Box>
                  <Box mt={1} style={{ fontSize: "12px", color: "grey" }}>
                    By continuing, I agree with the Privacy Policy, Terms &
                    Conditions
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default RegistrationForm;
