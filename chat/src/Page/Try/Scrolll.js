import { Box } from "@mui/material";
import React, { useRef } from "react";

const Scroll = () => {
  const messageEndRef1 = useRef(null);
  const scrollToBottom1 = () => {
    messageEndRef1.current.scrollIntoView({ behavior: "smooth" });
  };

  const messageEndRef2 = useRef(null);
  const scrollToBottom2 = () => {
    messageEndRef2.current.scrollIntoView({ behavior: "smooth" });
  };

  const message1 = [
    { mess: "hlw" },
    { mess: "mess" },
    { mess: "game" },
    { mess: "dfxb" },
    { mess: "hf" },
    { mess: "sf" },
    { mess: "gf" },
    { mess: "fg" },
    { mess: "gf" },
  ];

  const message2 = [
    { mess: "gf" },
    { mess: "fg" },
    { mess: "fg" },
    { mess: "s" },
    { mess: "gs" },
    { mess: "hjyggi" },
    { mess: "ewf" },
    { mess: "iuk" },
    { mess: "jmu" },
    { mess: "uyt" },
    { mess: "tn" },
    { mess: "hfn" },
  ];

  return (
    <>
      <Box style={{ maxHeight: "200px", overflowY: "auto" }}>
        {message1.map((item, i) => (
          <Box key={i}> {item.mess} </Box>
        ))}
        <div ref={messageEndRef1} />
      </Box>
      <button onClick={scrollToBottom1}>Submit</button>

      <Box style={{ maxHeight: "200px", overflowY: "auto" }}>
        {message2.map((item, i) => (
          <Box key={i}> {item.mess} </Box>
        ))}
        <div ref={messageEndRef2} />
      </Box>
      <button onClick={scrollToBottom2}>Submit</button>
    </>
  );
};

export default Scroll;
