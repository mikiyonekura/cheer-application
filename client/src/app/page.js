'use client';
import { useEffect, useState } from 'react'
import io from "socket.io-client"
let socket;

export default function Home() {
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const [z,setZ] = useState(0);

  useEffect(() => {
    // コンポーネントがマウントされたときに socket インスタンスを作成
    socket = io('http://localhost:4000');

    // コンポーネントがアンマウントされるときに socket 接続を閉じる
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // 加速度センサーイベント処理
    console.log("start_sensor");
    const handleDeviceAcceleration = function(e){
      let accX = e.accelerationIncludingGravity.x;
      let accY = e.accelerationIncludingGravity.y;
      let accZ = e.accelerationIncludingGravity.z;
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
        
        <button 
          style={{ border: "1px solid black" }}
          onClick={() => {
          // サーバーに加速度データを送信を送信
          const acc = {
            x: 1,
            y: 2,
            z: 3
          }
          socket.emit("sendAcceleration", acc)
        }}>通信</button>
      </div>
    </main>
  );
}
