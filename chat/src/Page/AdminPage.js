import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useDebugValue, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { seteditId } from "../Reducers/UiReducer";
import RegistrationForm from "../Form/RegistrationForm";

const AdminPage = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const adminbackendUrl = process.env.REACT_APP_ADMIN_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  // const [blockId, setBlockId] = useState(null);

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/getallusers.php`
      );

      if (Array.isArray(response.data.data)) {
        // Ensure that the response is an array
        setCountries(response.data.data);
        setFilteredCountries(response.data.data);
      } else {
        console.error("Invalid data format from the API.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBlock = async (item) => {
    const form = new FormData();
    form.append("id", item);

    try {
      const response = await fetch(
        `${adminbackendUrl}/block.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("block Successfully");
        navigate("/chat/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  const handleUnBlock = async (item) => {
    const form = new FormData();
    form.append("id", item);

    try {
      const response = await fetch(
        `${adminbackendUrl}/unblock.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("Unblock Successfully");
        navigate("/chat/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  const handleDelete = async (item) => {
    const form = new FormData();
    form.append("id", item);

    try {
      const response = await fetch(
        `${adminbackendUrl}/delete.php`,
        {
          method: "POST",
          body: form,
          // credentials: "include",
        }
      );

      if (response.ok) {
        console.log("response", response.data);
        alert("Delete Successfully");
        navigate("/chat/admin");
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.error("An error occurred while logging", error);
    }
  };
  const columns = [
    {
      name: "UserId",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Username",
      cell: (row) => (
        <div>
          {row.username}
          {row.online === "1" && (
            <span style={{ color: "green", marginLeft: "5px" }}>●</span>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/chat/adminedit");
              dispatch(seteditId(row));
            }}
          >
            Edit
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="btn btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
          {row.status == "0" ? (
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-warning"
              onClick={() => {
                handleBlock(row.id);
              }}
            >
              Block
            </button>
          ) : (
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-warning"
              onClick={() => {
                handleUnBlock(row.id);
              }}
            >
              Unblock
            </button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getCountries();
  }, [handleUnBlock, handleBlock]);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.username.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);

  const customStyles = {
    rows: {
      style: {
        fontSize: "16px",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/chat/adminlogin");
  };

  return (
    <Grid style={{}} container>
      <Grid
        style={{ boxShadow: "0 0 2px", height: "100vh", background: "#d0ecfd" }}
        item
        lg={2}
        mx="auto"
      >
        <Box style={{}} mt={2} pl={1} pr={1}>
          <img
            style={{ width: "100%" }}
            src="https://atypicalsoftware.com/images/logo.png"
            alt=""
          />
        </Box>
        <Box
          style={{
            boxShadow: "0 0 2px",
            padding: "5px",
            cursor: "pointer",
            background: "white",
          }}
          ml={2}
          mr={2}
          mt={2}
        >
          <h5>Users</h5>
        </Box>

        <Box
          style={{
            boxShadow: "0 0 2px",
            padding: "5px",
            cursor: "pointer",
            background: "white",
          }}
          ml={2}
          mr={2}
          mt={2}
          onClick={() => handleLogout()}
        >
          <h5>Logout</h5>
        </Box>
      </Grid>
      <Grid
        style={{ boxShadow: "0 0 2px", background: "#d0ecfd" }}
        item
        lg={9.5}
        mx="auto"
      >
        <Box style={{ display: "flex" }}>
          <Box mt={2} ml={2}>
            {" "}
            <h3> UserList </h3>
          </Box>
          <Box>
            <RegistrationForm />
          </Box>
        </Box>
        <Box style={{ boxShadow: "0 0 2px", margin: "10px" }}>
          <DataTable
            // title="User List"
            columns={columns}
            data={filteredCountries}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="500px"
            // selectableRows
            selectableRowsHighlight
            highlightOnHover
            subHeader
            // subHeaderComponent={
            //   <input
            //     placeholder="Search Here"
            //     className="w-25 form-control"
            //     type="text"
            //     value={search}
            //     onChange={(e) => setSearch(e.target.value)}
            //   />
            // }
            subHeaderAlign="right"
            customStyles={customStyles}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminPage;
