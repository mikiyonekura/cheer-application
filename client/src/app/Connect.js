import React from 'react'

const PostToServer = async (acc) => {
    const response = await fetch("https://fb31-150-31-93-196.ngrok-free.app/api", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(acc),
        });
    
    const result = await response.json();
    console.log(result);
} 

const Connect = () => {
  return (
    <div>
        <button
          style={{ border: "1px solid black" }}
          onClick={() => {
            // サーバーに加速度データを送信を送信
            const acc = {
                            "first":[
                            "hugaku"
                            ],
                            "second":[
                            "hogebyuuuuuuu"
                            ]
                        }

            PostToServer(acc);

          }}
        >accデータを送る</button>

    </div>
  )
}

export default Connect



//sendGetの関数

// const sendGet = async () => {
//     try {
//         const response = await fetch("https://fb31-150-31-93-196.ngrok-free.app/api", {
//             method: "GET",
//             mode: "cors",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         if (!response.ok) {
//             throw new Error('HTTP error ' + response.status);
//         }
//         const data = await response.json();
//         console.log(data);

//     } catch (error) {
//         console.error('Fetch failed:', error);
//     }
// };