"use client"
import { useEffect, useState } from 'react'
import { Box, } from "@mui/material"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

const CalList = [];

const PostToServer = async (acc) => {
  const response = await fetch("https://8795-150-31-93-196.ngrok-free.app/api", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
      });
  
  const result = await response.json();
  console.log('===========result===========\n' + result.message);
  CalList.push(result.message);
} 

const meanCalorie = () => {
  let sum = 0;
  for (let i = 0; i < CalList.length; i++) {
    sum += Number(CalList[i]);
  }
  const mean = sum / CalList.length;
  console.log('mean = sum / CalList.length',sum, CalList.length)
  console.log("平均カロリー:" + mean + "kcal");
  return mean;
}

export default function Home(){
      //１秒ごとに更新される三次元の加速度
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const [z,setZ] = useState(0);

  const [xyzlist,setXYZlist] = useState([{x:0,y:0,z:0}]);

  const [acc, setAcc] = useState({
    "weight": 60,
    "DATA": xyzlist
  });

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

  useEffect(() => {
    console.log("accが更新されました")
    console.log(acc)
    PostToServer(acc);
}
,[acc])

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

        setAcc((prevAcc) => ({
          ...prevAcc,
          DATA: xyzlist,
        }));
      }
    }
    console.log(xyzlist)
  },[x,y,z]
  )

  const [mean,setMean] = useState(0);
  const toggleStart = () =>{
    setIsStart((p) =>!p);
    console.log("toggle");
    if (isStart){
      console.log("平均カロリーを計算")
      setMean(meanCalorie());
    }
  }
    return (
        <Box sx={{bgcolor:"rgba(23,61,123,1)"}}bgcolor="#17337B" display="flex" justifyContent="center" alignItems="center" height="100vh">
            {isStart?<PauseCircleOutlineIcon sx={{  color: "rgba(196, 41, 63, 1)",fontSize: 300 } } onClick={toggleStart} />:
            <PlayCircleOutlineIcon sx={{  color: "rgba(196, 41, 63, 1)",fontSize: 300 } } onClick={toggleStart} />}
            <p>{mean}</p>
        </Box>
    )
}