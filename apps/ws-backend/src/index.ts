import { WebSocketServer } from "ws";
const wss = new WebSocketServer({port: 8080});
wss.on("connection", function connection(ws){
    ws.on("messgae", function messgae(data){
        ws.send("pong");
    });
});