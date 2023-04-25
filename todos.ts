import {QueryCommand, GetCommand} from '@aws-sdk/lib-dynamodb'
import {documentClient} from './dynamodbclient'
import { Todo } from './types'
import { GetObjectCommand } from "@aws-sdk/client-s3";
import axios from 'axios'

// never got used, because public read access so can just use url
export const getTodoS3Image = async (s3Reference: string): Promise<any> => {
    const command = new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: s3Reference });
        try {
            const response = await s3.send(command);
            console.log(response.Body)
        } catch (error){
            console.error(error);
        }
    }

export interface MyComponentProps {
    s3Reference: string;
    fileType: string;
    file: any;
}
// has to be declared and used in file, else it's a PITA:

// export const postTodoS3Image = async (s3Reference: string, fileType: string, file: any): Promise<any> => {
//     try {
//      const response = await axios.post('https://k2w7488s0c.execute-api.eu-west-2.amazonaws.com/prod/getSignedUrl', {"s3Reference": s3Reference, "fileType": fileType})
     
//      const result = await axios.put(response.data.url, file,{
//          headers: {
//            'Content-Type': fileType,
//          }
//        })
//        console.log("success!")
//     } catch (error){
//      console.log(error)
//     }}

export const listTodos = async (): Promise<Todo[]|[]> => {
    const command = new QueryCommand({
        TableName:process.env.TABLE_NAME,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues:{
            ':pk':'todo'
        }
    })

    try {
        const data = await documentClient.send(command)
        const todos = (data.Items?.map((item) => {
            return {
                    id: item.sk,
                    title: item.title,
                    description: item.description,
                    completed: item.completed
            }
        }))
        return todos || []
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getTodoIds = async () => {
    const data = await listTodos();
        return data.map((todo: Todo) => {
            return {
                params: {
                    id: todo.id
                }
            }
        })
    }

export const getTodoData = async (id: string): Promise<Todo> => {
    const command = new GetCommand({
        TableName:process.env.TABLE_NAME,
        Key:{
            pk:'todo',
            sk: id,
        }
    })
    try {
        const response = await documentClient.send(command);
            const {completed, title, description} = response.Item!
                return {
                    id,
                    completed,
                    title,
                    description
                }

    } catch (error){
        throw error
    }
}

  // helped when setting up the api gateway
  export const fetchMessage = async () => {
    axios.get('https://k2w7488s0c.execute-api.eu-west-2.amazonaws.com/prod/')
    .then(response => {
      console.log(response.data)
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
  }