import {QueryCommand, GetCommand} from '@aws-sdk/lib-dynamodb'
import {documentClient} from './dynamodbclient'
import { Todo } from './types'

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