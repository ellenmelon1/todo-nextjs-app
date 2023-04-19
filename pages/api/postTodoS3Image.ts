import { postTodoS3Image} from "@/todos";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await postTodoS3Image(req.body.s3Reference, req.body.fileType, req.body.file);

        console.log("response in api: ", response)

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}