import { NextResponse } from "next/server";

const sendToPythonPost = async (acc) => {
  const response = await fetch("https://817c-150-31-93-196.ngrok-free.app/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acc),
      });

  console.log(response);
} 

//カロリー計算の関数

let totalCalorie = 0;

const caliculateCaloie = (status) => {  
  //statusに応じてMetのメッツをもとに計算

  //消費カロリー(kcal) ＝ メッツ * 体重kg * 運動時間 * 1.05
  //運動時間が3秒だった場合
  let cal = 0;
  //歩行中の場合 or 走っている場合 or ジャンプしている場合
  if (status == "walking") {
      cal = 3 * 60 * 3 * 1.05;
  } else if (status == "running") {
      cal = 6 * 60 * 3 * 1.05;
  } else if (status == "jumping") {
      cal = 8 * 60 * 3 * 1.05;
  };

  return cal;
}


export async function POST(acc) {
    
    //歩行中かジャンプしたとかが帰ってくる
    // sendToPython();
    sendToPythonPost(acc);
    // const status = sendToPython(acc);
    // console.log(status);
    const status = "walking";

    const cal = caliculateCaloie(status);
    totalCalorie += cal;
    console.log("totalCalorieは " + totalCalorie);

    return NextResponse.json({
        message: totalCalorie
    })

}



//flask相手にGetする関数

// const sendToPython = async () => {
//   try {
//       const response = await fetch("https://817c-150-31-93-196.ngrok-free.app/", {
//           method: "GET",
//           mode: "cors",
//           headers: {
//               "Content-Type": "application/json",
//           },
//       });
//       if (!response.ok) {
//           throw new Error('HTTP error ' + response.status);
//       }
//       // const data = await response.json();
//       console.log(response);

//   } catch (error) {
//       console.error('Fetch failed:', error);
//   }
// };

// export async function GET() {
//   return NextResponse.json({
//       message: "getはできたよ"
//   })
// }