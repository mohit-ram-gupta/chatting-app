import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { setMedia } from "../../Reducers/UiReducer";
import { useDispatch, useSelector } from "react-redux";
import { BiDownload } from "react-icons/bi";
import pdfLogo from "../../image/pdfLogo.png";

const Media = () => {
  const { username } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const { user = [] } = useSelector((state) => state.ui);
  const [mediaType, setMediatype] = useState("media");
  return (
    <>
      <Grid container>
        <Grid item lg={12}>
          <Box
            style={{
              position: "absolute",
              zIndex: 999,
              background: "white",
              height: "100vh",
              width: "300px",
              right: "5px",
              border: "2px solid #b6bdc2",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  padding: "20px 20px 0px 20px",
                  alignItems: "center",
                }}
              >
                <Box>
                  {" "}
                  <img
                    style={{
                      borderRadius: "28px",
                      width: "50px",
                      height: "50px",
                      border: "2px solid #139cec",
                    }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpX6V5vW3sw6xZd0OojjdzPVBNQxZOR8iqALSVhkCtmGXsgW9IDx6o2MFEZAsMlTx0BQ&usqp=CAU"
                    alt=""
                  />
                </Box>

                <Box ml={1}>
                  {" "}
                  <h5>{username}</h5>
                </Box>
              </Box>

              <Box onClick={() => dispatch(setMedia(false))} mr={4}>
                <RxCross2 style={{ fontSize: "22px", cursor: "pointer" }} />
              </Box>
            </Box>

            <hr />

            <Box
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                cursor: "pointer",
              }}
            >
              <Box
                onClick={() => setMediatype("media")}
                style={{
                  borderBottom: mediaType == "media" ? "3px solid #139cec" : "",
                  paddingBottom: "0px",
                }}
              >
                Media
              </Box>
              <Box
                onClick={() => setMediatype("doc")}
                style={{
                  borderBottom: mediaType == "doc" ? "3px solid #139cec" : "",
                  paddingBottom: "0px",
                }}
              >
                Doc
              </Box>
              <Box
                style={{
                  borderBottom: mediaType == "link" ? "3px solid #139cec" : "",
                  paddingBottom: "0px",
                }}
                onClick={() => setMediatype("link")}
              >
                Link
              </Box>
            </Box>

            {/* <Box style={{ display: "flex" }} mt={2}>
  {user.some(item => item.image) ? (
    user.map((item, i) => (
      item.image && (
        <Box key={i} mr={2} ml={2}>
          <a
            style={{ textDecoration: "none" }}
            href={`http://localhost/chatting-app-php-react/images/${item.image}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              style={{
                width: "100px",
                height: "100px",
                cursor: "pointer",
              }}
              src={`http://localhost/chatting-app-php-react/images/${item.image}`}
              alt=""
            />
          </a>
        </Box>
      )
    ))
  ) : (
    <Box style={{ display: "flex", justifyContent: "center"}}>

<Box mt={2} style={{textAlign: "center", margin: "10px 80px"}} ml={3}> 

      No Media Found !!!
</Box>
        </Box>
  )}
</Box> */}

            {mediaType === "media" ? (
              <>
                <Box
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    overflowX: "scroll",
                  }}
                  mt={2}
                  ml={2}
                >
                  {user.some((item) => item.image) ? (
                    user.map(
                      (item, i) =>
                        item.image && (
                          <Box
                            key={i}
                            style={{
                              flexBasis: "calc(50% - 16px)",
                              margin: "8px",
                            }}
                          >
                            <a
                              style={{ textDecoration: "none" }}
                              href={`http://localhost/chatting-app-php-react/images/${item.image}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  cursor: "pointer",
                                }}
                                src={`http://localhost/chatting-app-php-react/images/${item.image}`}
                                alt=""
                              />
                            </a>
                          </Box>
                        )
                    )
                  ) : (
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                      <Box
                        mt={2}
                        style={{ textAlign: "center", margin: "10px 80px" }}
                        ml={3}
                      >
                        No Media Found !!!
                      </Box>
                    </Box>
                  )}
                </Box>
              </>
            ) : (
              <Box style={{ display: "flex" }} mt={2}>
                {user.some((item) => item.pdf) ? (
                  user.map(
                    (item, i) =>
                      item.pdf && (
                        <Box key={i} mr={2} ml={2}>
                          <a
                            style={{ textDecoration: "none" }}
                            href={`http://localhost/chatting-app-php-react/pdf/${item.pdf}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              style={{
                                width: "100px",
                                cursor: "pointer",
                              }}
                              src={pdfLogo}
                              alt="PDF Logo"
                            />
                            <span
                              style={{
                                color: "white",
                                marginTop: "10px",
                              }}
                            >
                              Download PDF <BiDownload />
                            </span>
                          </a>
                        </Box>
                      )
                  )
                ) : (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Box
                      mt={2}
                      style={{ textAlign: "center", margin: "10px 80px" }}
                      ml={3}
                    >
                      No Doc Found !!!
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Media;
