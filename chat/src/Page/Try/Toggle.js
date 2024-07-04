import { Box } from '@mui/material'
import React, { useState } from 'react'

const Toggle = () => {
    const [toggle, setToggle] = useState(true)

    const handleClick = () => {
        setToggle(prevToggle => !prevToggle)
    }
    return (
        <>
            {toggle ? (
                <Box onClick={handleClick} style={{background: "red", padding: "50px"}}>
                </Box>
            ) : (
                <Box onClick={handleClick} style={{background: "blue", padding: "50px"}}>
                </Box>
            )}
        </>
    )
}

export default Toggle
