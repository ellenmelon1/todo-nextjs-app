import { listTodos } from "@/todos";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const todos = await listTodos()
        res.status(200).json(todos)
    } catch (error) {
        console.log(error)
    }
}