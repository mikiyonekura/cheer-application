const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
    }
});

const PORT = 4000;

//クライアントと通信(from 公式ドキュメント)
io.on("connection", (socket) => {
    console.log("クライアントと接続しました！")

    // クライアントからのメッセージを受信
    socket.on("sendAcceleration", (acc) => {
        console.log(acc)
    });

    socket.on("disconnect", () => {
        console.log("クライアントと接続が切れました！")
    })
});


server.listen(PORT, () => console.log(`server is running on ${PORT}`));
