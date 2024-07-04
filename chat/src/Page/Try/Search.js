import React from 'react'

const Search = () => {
  return (
    <>
    {/* sender and receiver dono me h  */}
    {item.message && (
                        <>
                        
                       <Box style={{display: "flex", justifyContent: "space-between"}}>
                        <Box
                          style={{
                            textTransform: "capitalize",
                            fontSize: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            paddingLeft: "20px",
                            // width: "200px"
                            width: "messageWidth"
                          }}
                        >
                          {item.rply_msg && (
                            <Box
                            mt={2}
                              style={{
                                background: item.receiver_id !== selectId ? "rgb(19 156 236 / 41%)" : "rgb(205 31 31 / 99%)",
                                borderRadius: "8px",
                                padding: "5px",
                                marginBottom: "10px",
                                // width: `messageWidth + 12px`
                              }}
                            >
                              {item.rply_msg}
                           
                            </Box>
                          )}
                          <Box>{item.message}    { item.receiver_id == receiverId && (<span><RiCheckDoubleLine style={{color: item.seen == "1" ? "grey": "blue"}} /> </span>)} </Box>
                          {/* <br /> */}
                       
                        </Box>

                        <Box
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setSel_MessId(item.id));
                                dispatch(setSel_Mess(item.message));
                                handleToggle();
                              }}
                            >
                              <PiDotsThreeOutlineVerticalDuotone />
                            </Box>
                            </Box>
                        </>
                      )}



{/* sender wala me three dot nhi h */}
{item.message && (
                        <Box
                          style={{
                            textTransform: "capitalize",
                            fontSize: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            paddingLeft: "20px",
                            // width: "200px"
                            width: "messageWidth"
                          }}
                        >
                          {item.rply_msg && (
                            <Box
                            mt={2}
                              style={{
                                background: item.receiver_id !== selectId ? "rgb(19 156 236 / 41%)" : "rgb(205 31 31 / 99%)",
                                borderRadius: "8px",
                                padding: "5px",
                                marginBottom: "10px",
                                // width: `messageWidth + 12px`
                              }}
                            >
                              {item.rply_msg}
                           
                            </Box>
                          )}
                          <Box>{item.message}    { item.receiver_id == receiverId && (<span><RiCheckDoubleLine style={{color: item.seen == "1" ? "grey": "blue"}} /> </span>)}  {!item.rply_msg && item.receiver_id !== selectId && (
                            <Box
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setSel_MessId(item.id));
                                dispatch(setSel_Mess(item.message));
                                handleToggle();
                              }}
                            >
                              <PiDotsThreeOutlineVerticalDuotone />
                            </Box>
                          )}</Box>
                          {/* <br /> */}
                       
                        </Box>
                      )}
    
    </>
  )
}

export default Search