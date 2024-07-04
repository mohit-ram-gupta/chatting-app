import { Grid, Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const backendUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("dob", formData.dob);
    form.append("password", formData.password);

    try {
      const response = await fetch(
        `${backendUrl}/registration.php`,
        {
          method: "POST",
          body: form,
        }
      );

      if (response.ok) {
        navigate("/chat");
        alert("Registration Successfully");
        console.log("successfully");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("An error while registration");
    }
  };
  return (
    <Grid
      style={{
        background: `url(https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg?w=740&t=st=1695184988~exp=1695185588~hmac=589eaea881d4191567ed9b2ec7660aabb2fa40e541ed15ae923d4cdbb355e64d)`,
        backgroundSize: "100%",
        height: "100vh",
        color: "white",
      }}
      container
    >
      <Grid item lg={5} mx="auto">
        <Box
        // style={{
        //   background: `url( https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg?w=740&t=st=1695184988~exp=1695185588~hmac=589eaea881d4191567ed9b2ec7660aabb2fa40e541ed15ae923d4cdbb355e64d)`,
        // }}
        >
          <Box mt={5}>
            <h3>Registration Form </h3>
          </Box>
          <Box mt={2}>
            <h5>Userame</h5>
          </Box>
          <Box>
            <input
              className="form-control"
              placeholder="Enter your name"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value={formData.username}
            />
          </Box>
          <Box mt={2}>
            {" "}
            <h5>Email</h5>{" "}
          </Box>
          <Box>
            <input
              className="form-control"
              placeholder="Enter your email"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </Box>
          <Box mt={2}>
            {" "}
            <h5>Phone No</h5>{" "}
          </Box>
          <Box>
            <input
              className="form-control"
              placeholder="Enter your phone no"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              value={formData.phone}
            />
          </Box>
          <Box mt={2}>
            {" "}
            <h5>DOB</h5>{" "}
          </Box>
          <Box>
            <input
              className="form-control"
              placeholder="Enter your Password"
              type="date"
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              value={formData.dob}
            />
          </Box>
          <Box mt={2}>
            {" "}
            <h5>password</h5>{" "}
          </Box>
          <Box>
            <input
              className="form-control"
              placeholder="Enter your password"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
          </Box>

          <Box
            onClick={handleSubmit}
            mt={2}
            style={{ textAlign: "center", cursor: "pointer" }}
            className="form-control btn-dark"
          >
            Submit
          </Box>
          <Box
            onClick={() => navigate("/chat")}
            mt={2}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontWeight: "bold",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Login ?
          </Box>
        </Box>
      </Grid>
      <Grid item lg={6} mx="auto">
        <Box mt={3}>
          <img
            style={{ width: "600px", height: "600px" }}
            src="https://media.istockphoto.com/id/888514314/photo/typing-an-username-and-password-on-the-web-page-close-up-of-the-web-page-with-login-empty-form.jpg?s=1024x1024&w=is&k=20&c=WGLmSeZz8HOzNhpMgr4Q9iZ8S75YGY5LFogKT5S49jo="
            alt=""
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
