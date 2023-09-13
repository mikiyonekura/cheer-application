'use client';
import { useEffect, useState } from 'react'
import io from "socket.io-client"
import Steps from './Steps'
let socket;

export default function Home() {
  const [alpha, setAlpha] = useState(null);

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
    const handleDeviceOrientation = function(e){
      // alpha, beta, gammaの値を取得
      let alpha = e.alpha;
      setAlpha(alpha);  // alpha ステートを更新

      let beta = e.beta;
      let gamma = e.gamma;

      console.log("alpha : " + alpha);
      console.log("beta : " + beta);
      console.log("gamma : " + gamma);
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation, false);
    
    // イベントリスナーをクリーンアップ
    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation, false);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>加速度alphaはこちらです</p>
        <p>{alpha}</p>
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
        <Steps />
      </div>
    </main>
  );
}
