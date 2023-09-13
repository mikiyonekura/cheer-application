"use Client"
import { Box, } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
export default function Home(){
    return (
        <Box sx={{bgcolor:"rgba(23,61,123,1)"}}bgcolor="#17337B" display="flex" justifyContent="center" alignItems="center" height="100vh">
            <PlayCircleOutlineIcon sx={{  color: "rgba(196, 41, 63, 1)",fontSize: 300 }}/>
        </Box>
    )
}