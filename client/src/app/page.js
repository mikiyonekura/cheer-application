'use client';
import { useEffect, useState } from 'react'
import Steps from './Steps'



export default function Home() {
  //１秒ごとに更新される三次元の加速度
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const [z,setZ] = useState(0);

  const [xyzlist,setXYZlist] = useState([{x:0,y:0,z:0}]);


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
    if (xyzlist.length < 100)  {
      setXYZlist((p)=>[...p,{x:x,y:y,z:z}])
    }
    else {
      setXYZlist((p)=>[{x:x,y:y,z:z}])
    }
    console.log(xyzlist)
  },[x,y,z]
  )
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>加速度はこちらです</p>
        <p>x:{x}</p>
        <p>y:{y}</p>
        <p>z:{z}</p>

        <button 
          onClick={() => {
            // サーバーに加速度データを送信を送信
            console.log("sendAcceleration");
            const acc = {
              x: 1,
              y: 2,
              z: 3
            }
          }}
          style={{ border: "1px solid black" }}
          >通信</button>
          
        <Steps />

      </div>
    </main>
  );
}
