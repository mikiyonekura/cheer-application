"use client"
import { useEffect, useState } from 'react'
import { Box, } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

export default function Home(){
      //１秒ごとに更新される三次元の加速度
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const [z,setZ] = useState(0);

  const [xyzlist,setXYZlist] = useState([{x:0,y:0,z:0}]);

  const [isStart,setIsStart] = useState(false)
  useEffect(() => {
    // 加速度センサーイベント処理
    console.log("start_sensor");
    let accX;
    let accY;
    let accZ;
    const handleDeviceAcceleration = function(e){
      accX = e.acceleration.x;
      accY = e.acceleration.y;
      accZ = e.acceleration.z;
    };
    const intervalId = setInterval(()=>{
      setX(accX); 
      setY(accY);
      setZ(accZ);
    },100);

    window.addEventListener("devicemotion", handleDeviceAcceleration, false);
    
    // イベントリスナーをクリーンアップ
    return () => {
      window.removeEventListener("deviceorientation", handleDeviceAcceleration, false);
    };
  }, []);

  useEffect(()=>{
    if (!isStart){
        setXYZlist((p)=>[{x:x,y:y,z:z}])
    }
    else if (xyzlist.length < 100)  {
      setXYZlist((p)=>[...p,{x:x,y:y,z:z}])
    }
    else {
      setXYZlist((p)=>[{x:x,y:y,z:z}])
      if (isStart){
        console.log("fetch API!!!!!!!!!!!!!!!!!!!!!!!!!!")
      }
    }
    console.log(xyzlist)
  },[x,y,z]
  )

  const toggleStart = () =>{
    setIsStart((p) =>!p);
    console.log("toggle");
  }
    return (
        <Box sx={{bgcolor:"rgba(23,61,123,1)"}}bgcolor="#17337B" display="flex" justifyContent="center" alignItems="center" height="100vh">
            {isStart?<PauseCircleOutlineIcon sx={{  color: "rgba(196, 41, 63, 1)",fontSize: 300 } } onClick={toggleStart} />:
            <PlayCircleOutlineIcon sx={{  color: "rgba(196, 41, 63, 1)",fontSize: 300 } } onClick={toggleStart} />}

        </Box>
    )
}