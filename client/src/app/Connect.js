import React from 'react'

let totalCalorie = 0;

const PostToServer = async (acc) => {
    const response = await fetch("https://ad31-150-31-93-196.ngrok-free.app/api", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(acc),
        });
    
    const result = await response.json();
    console.log('===========result===========\n' + result.message);
} 

const Connect = (props) => {
    // console.log(props.acc)
    const acc = props.acc
    return (
        <div>
            <button
            style={{ border: "1px solid black" }}
            onClick={() => {
                // サーバーに加速度データを送信を送信
                // const acc = {
                //                 "first":[
                //                 "hugaku"
                //                 ],
                //                 "second":[
                //                 "hogebyuuuuuuu"
                //                 ]
                //             }

                //何秒おきに送るかは未定
                //ここで特定の時間おきにぐるぐる
                PostToServer(acc);

                totalCalorie += 1;
                console.log("カロリー計:" + totalCalorie + "kcal");

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