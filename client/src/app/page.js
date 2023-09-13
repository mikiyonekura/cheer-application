'use client';
import { useEffect, useState } from 'react'
import Steps from './Steps'
import Connect from './Connect';
import Test from './Test';

export default function Home() {
  //１秒ごとに更新される三次元の加速度
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const [z,setZ] = useState(0);


  const [xyzlist,setXYZlist] = useState([{x:0,y:0,z:0}]);

  const [acc, setAcc] = useState({
    "weight": 60,
    "DATA": xyzlist
  });

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
    if (xyzlist.length < 600)  {
      setXYZlist((prev) => [...prev, { x, y, z }]);
      console.log('doing!');
    }
    else {
      setAcc((prevAcc) => ({
        ...prevAcc,
        DATA: xyzlist,
      }));

      setXYZlist([{ x, y, z }]);
      console.log('-------------start------------');
    }
    // console.log(xyzlist);
  }, [x, y, z]);

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>加速度はこちらです</p>
        <p>x:{x}</p>
        <p>y:{y}</p>
        <p>z:{z}</p>

        {/* <Steps /> */}
        <Connect acc={acc}/>
        <Test acc={acc}/>

        <button
          style={{ border: "1px solid black" }}
          onClick={() => {
            setXYZlist((p)=>[...p,{x:x,y:y,z:z}])
          }}
        >
          debug
        </button>

      </div>
    </main>
  );
}
