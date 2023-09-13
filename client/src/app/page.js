'use client';
import { useEffect, useState } from 'react'
import Steps from './Steps'
import Connect from './Connect';
import Test from './Test';

export default function Home() {
  const [x,setX] = useState(0);
  const [y,setY] = useState(0);
  const [z,setZ] = useState(0);

  const [acc, setAcc] = useState({
    "weight": 60,
    "DATA":[
      {
          "x": 0.2,
          "y": 0.1,
          "z": 0.2
      },
      {
          "x": 0.5,
          "y": 0.1,
          "z": -0.1
      },
    ]
  });

//   const acc = {"weight": 60,
//   "DATA":[
//      {
//          "x": 0.2,
//          "y": 0.1,
//          "z": 0.2
//      },
//      {
//          "x": 0.5,
//          "y": 0.1,
//          "z": -0.1
//      },
//      {
//          "x": -0.2,
//          "y": -0.1,
//          "z": 0
//      },
//      {
//          "x": 0,
//          "y": 0,
//          "z": 0
//      },
//      {
//          "x": -0.1,
//          "y": -0.1,
//          "z": -0.1
//      },
//      {
//          "x": 0,
//          "y": 0,
//          "z": 0.1
//      },
//      {
//          "x": 0.2,
//          "y": 0,
//          "z": -0.4
//      },
//      {
//          "x": 0.1,
//          "y": 0.30000000000000004,
//          "z": -1.7000000000000002
//      },
//      {
//          "x": 2.2,
//          "y": 2.1,
//          "z": -4.5
//      },
//      {
//          "x": -11.8,
//          "y": -8.5,
//          "z": 33.1
//      },
//      {
//          "x": 4.5,
//          "y": -11.200000000000001,
//          "z": 10.600000000000001
//      },
//      {
//          "x": 2.1,
//          "y": -12.5,
//          "z": -13.8
//      },
//      {
//          "x": 3,
//          "y": -8.3,
//          "z": -10.3
//      },
//      {
//          "x": 6.1000000000000005,
//          "y": -8.1,
//          "z": -9.8
//      },
//      {
//          "x": 9.4,
//          "y": -13,
//          "z": -23.700000000000003
//      },
//      {
//          "x": 0.8,
//          "y": -12.600000000000001,
//          "z": 17.7
//      },
//      {
//          "x": -1.1,
//          "y": -4.5,
//          "z": 27.900000000000002
//      },
//      {
//          "x": -3.2,
//          "y": 0.6000000000000001,
//          "z": 4
//      },
//      {
//          "x": 1.1,
//          "y": 1,
//          "z": -1.9000000000000001
//      },
//      {
//          "x": 2,
//          "y": 1.8,
//          "z": -3.8000000000000003
//      },
//      {
//          "x": 0.5,
//          "y": 0.5,
//          "z": -3
//      },
//      {
//          "x": 1.3,
//          "y": 1.3,
//          "z": -0.30000000000000004
//      },
//      {
//          "x": -9.200000000000001,
//          "y": -5.800000000000001,
//          "z": 10.5
//      },
//  ]
//  }

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
        <Connect acc={acc}/>
        <Test acc={acc}/>

        <button
          style={{ border: "1px solid black" }}
          onClick={() => {
            let newAcc = {...acc}; // accオブジェクトの新しいコピーを作成します
            setAcc(newAcc); 
          }}
        >
          debug
        </button>

      </div>
    </main>
  );
}
