import { NextFunction, Request, Response } from "express";

const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

export default function middleware(req: Request, res: Response, next: NextFunction){

    try{

        const token = req.cookies.token;
        if(token){
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            if(decode){
                // @ts-ignore
                req.userId = decode.userID;
                next();
            }else{
                res.status(400).json({
                    message: "Unauthorized"
                })
            }
        } else {
            res.status(400).json({
                message: "You are not Signed-In"
            })
        }

    } catch(error){
        console.log("Error: " + error);
        res.status(500).json({
            message: "There was an error"
        })
    }
    
}