require("dotenv").config();

import { WebSocketServer } from "ws";
import jwt  from "jsonwebtoken";

const wss = new WebSocketServer({port: 8080});

wss.on("connection", function connection(ws, request){

    const cookie = require("cookie").parse(request.headers.cookie || "");
    const token = cookie.token;
    if(token){
        const decode = jwt.verify(token, process.env.JWT_SECRET ||"");
        if(decode){

        } else {
            ws.close();
            return;
        }
    } else{
        ws.close();
        return;
    }

    ws.on("messgae", function messgae(data){
        ws.send("pong");
    });

});