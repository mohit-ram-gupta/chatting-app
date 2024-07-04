import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

function MessageNotification({ item, id, formData }) {
  const [newMessageCount, setNewMessageCount] = useState(0);

  useEffect(() => {
    // Check if item.id matches the target id and new messages have arrived
    if (item.id === id && formData.message.length > 0) {
      // Update the new message count
      setNewMessageCount(formData.message.length);
    }
  }, [item.id, id, formData.message]);

  return (
    <div>
      {newMessageCount > 0 && (
        <Box pl={2} pr={2} style={{ background: "grey", borderRadius: "8px" }}>
          {newMessageCount}
        </Box>
      )}
    </div>
  );
}

export default MessageNotification;
