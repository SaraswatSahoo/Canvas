import { Request, Response } from "express";
import middleware from "./middleware";
import { SignUpSchema, SignInSchema } from "@repo/common/types";

require("dotenv").config();

const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieparser());

app.post("/signup", async (req : Request, res : Response) => {

    try{

        const parsedBody = SignUpSchema.safeParse(req.body);
        if(parsedBody.success){
            const { username, email, password } = parsedBody.data;
            const hashedPassword = await bcrypt.hash(password, 10);
            res.status(400).json({
                username,
                email,
                password: hashedPassword
            })
        }else{
            res.status(400).json({
                message: "Invalid Input"
            })
        }
        
    } catch(error) {

        console.log("error: " + error);
        res.status(500).json({
            message: "There was a Error"
        })
    }
})

app.post("/signin", (req : Request, res : Response) => {
    
    try{

        const parsedBody = SignInSchema.safeParse(req.body);

        if(parsedBody.success){
            const { username, password } = parsedBody.data;
            const userID = 1;
            const token = jwt.sign({userID}, process.env.JWT_SECRET);
            res.cookie("token", token);
            res.status(200).json({
                token,
                message: "Signed In Successfully"
            })
        } else {
            res.status(400).json({
                message: "Invalid Input"
            })
        }
    } catch(error) {

        console.log("Error: " + error);
        res.status(500).json({
            message: "There was an Error"
        })
    }
})

app.post("/room", middleware, (req : Request, res : Response) => {
    
    res.json({
        roomID: 123
    })
})

app.listen(3001);