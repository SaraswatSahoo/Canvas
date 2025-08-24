import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string().max(20),
    email: z.string().includes("@"),
    password: z.string().min(8)
})

export const SignInSchema = z.object({
    username: z.string().max(20),
    password: z.string().min(8)
})

export const CreateRoomSchema = z.object({
    roomname: z.string().max(20)
})