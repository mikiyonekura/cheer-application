const express = require("express");
const { stat } = require("fs");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://ad31-150-31-93-196.ngrok-free.app/",
        ],
    }
});

const PORT = 4000;
let totalCalorie = 0;

const sendToPython = async (acc) => {
    // const response = await fetch('url', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(acc),
    // });
    // const status = await response.json();
    const returnData = "帰ってきたよ"
    // console.log(status);

    return returnData;
} 

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

//クライアントと通信(from 公式ドキュメント)
io.on("connection", (socket) => {
    console.log("クライアントと接続しました！")

    // クライアントからのメッセージを受信
    socket.on("sendAcceleration", (acc) => {
        console.log(acc)
        // const accJson = JSON.stringify(acc); // 2番目の引数と3番目の引数はオプショナルで、整形のために使います
        // console.log(accJson);

        // //歩行中かジャンプしたとかが帰ってくる
        // // const status = sendToPython(acc);
        // const status = "walking";

        // const cal = caliculateCaloie(status);
        // totalCalorie += cal;

    });

    socket.on("finishMeasure", (dummy) => {
        console.log("計測終了");
        console.log(totalCalorie);
    });

    socket.on("disconnect", () => {
        console.log("クライアントと接続が切れました！")
    })
});


server.listen(PORT, () => console.log(`server is running on ${PORT}`));
