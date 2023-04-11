import {QueryCommand, GetCommand} from '@aws-sdk/lib-dynamodb'
import {unmarshall} from '@aws-sdk/util-dynamodb'
import {documentClient} from './dynamodbclient'
import { Todo } from './types'

interface Item {
    params: Todo
}

export const listTodos = async () => {
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
        console.log(todos)
        return todos
    } catch (error) {
        console.log(error)
        return error;
    }
}

// export const getAllTodoIds = async () => {
//     const data = await listTodos();
//         return data.Items?.map((item: Item) => {
//             return {
//                 params: {
//                     id: item.params.sk
//                 }
//             }
//         })
//     }

export const getTodoData = async (id: string) => {
    const command = new GetCommand({
        TableName:process.env.TABLE_NAME,
        Key:{
            pk:'todo',
            sk: id,
        }
    })
    try {
        const response = await documentClient.send(command);
        return {
            ...response.Item
        }
    } catch (error){
        return error
    }
}