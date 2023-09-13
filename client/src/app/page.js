'use client';
import { useEffect, useState } from 'react'
import Steps from './Steps'
import Connect from './Connect';

export default function Home() {
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const [z,setZ] = useState(0);

  useEffect(() => {
    // 加速度センサーイベント処理
    console.log("start_sensor");
    const handleDeviceAcceleration = function(e){
      let accX = e.acceleration.x;
      let accY = e.acceleration.y;
      let accZ = e.acceleration.z;
      setX(accX); 
      setY(accY);
      setZ(accZ);

    };

    window.addEventListener("devicemotion", handleDeviceAcceleration, false);
    
    // イベントリスナーをクリーンアップ
    return () => {
      window.removeEventListener("deviceorientation", handleDeviceAcceleration, false);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>加速度はこちらです</p>
        <p>x:{x}</p>
        <p>y:{y}</p>
        <p>z:{z}</p>

        <Steps />
        <Connect />


      </div>
    </main>
  );
}
