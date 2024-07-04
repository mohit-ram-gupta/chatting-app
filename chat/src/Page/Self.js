import { Box } from '@mui/system'
import React from 'react'

const Self = () => {
    const id = 2;

    const arr = [
        {
            receiverId: "3,1",
            name: "suraj"
        }, {
            receiverId: "1",
            name: "raj"
        }, 
    ]

    // Filter the array based on whether the id is in the receiverId list
    const filteredArr = arr.filter(item => item.receiverId.split(',').includes(String(id)));

    return (
        <>
            <Box>
                {filteredArr.map((item, i) => (
                    <Box key={i}>{item.name}</Box>
                ))}
            </Box>



            {/* {item.id === sel_messId && toggle ? (
            <Box style={{display: "flex"}}>

            <Box
              onClick={() => dispatch(setSel_MessId(null))}
              mt={1}
              style={{ background: "#23262f", padding: "5px 12px", color: "white", cursor: "pointer", marginLeft: "100px", borderRadius: "8px"}}
            >
              <span><MdOutlineReplyAll /> &nbsp;
              </span>
              Reply 
            </Box>
            </Box>
          ) : (
            null
          )} */}
        </>
    )
}

export default Self
