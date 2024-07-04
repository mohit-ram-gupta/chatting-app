import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminEditPage = () => {
  const adminbackendUrl = process.env.REACT_APP_ADMIN_URL;
  const { editId } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: editId.username,
    password: editId.password,
    phone: editId.phone,
    dob: editId.dob,
    email: editId.email,
    id: editId.id,
  });
  const handleSubmit = async () => {
    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);
    form.append("phone", formData.phone);
    form.append("dob", formData.dob);
    form.append("email", formData.email);
    form.append("id", formData.id);

    try {
      const response = await fetch(
      `${adminbackendUrl}/edit.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("Update Successfully");
        navigate("/chat/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  return (
    <>
      <Grid container>
        <Grid
          style={{
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            boxShadow: "0 0 2px",
            padding: "40px 100px",
            marginTop: "30px",
          }}
          item
          lg={6}
          mx="auto"
        >
          <Box style={{ fontWeight: "bold" }}>UserName</Box>
          <Box mt={2} mb={1}>
            <input
              className="form-control"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              type="text"
            />
          </Box>
          <Box style={{ fontWeight: "bold" }}>Email</Box>
          <Box mt={2} mb={1}>
            <input
              className="form-control"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
            />
          </Box>
          <Box style={{ fontWeight: "bold" }}>Password</Box>
          <Box mt={2} mb={1}>
            <input
              className="form-control"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
            />
          </Box>
          <Box style={{ fontWeight: "bold" }}>Phone</Box>
          <Box mt={2} mb={1}>
            <input
              className="form-control"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              type="number"
            />
          </Box>
          <Box style={{ fontWeight: "bold" }}>Date of Birth</Box>
          <Box mt={2} mb={1}>
            <input
              className="form-control"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              type="date"
            />
          </Box>
          <Box mt={2}>
            <button
              style={{ fontWeight: "bold" }}
              className="btn btn-primary form-control"
              onClick={handleSubmit}
            >
              Update
            </button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminEditPage;
