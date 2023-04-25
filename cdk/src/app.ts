const express = require('express');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const  { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { documentClient } from "./dynamodbclient";

const app = express();
app.use(express.json());
const s3 = new S3Client({ region: 'eu-west-2' });

app.get('/', (req: any, res: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send({message: 'Hello World!'})
})

app.post('/getSignedUrl', async (req: any, res: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (!req.body.s3Reference || typeof req.body.s3Reference !== 'string' || !req.body.fileType || typeof req.body.fileType !== 'string') return res.status(400).json({})

    const command = new PutObjectCommand({Bucket: process.env.BUCKET_NAME, Key: req.body.s3Reference, ContentType: req.body.fileType})

    try {
        const signedUrl = await getSignedUrl(s3, command, {expiresIn:3600});

        res.header("Access-Control-Allow-Origin", "*");
        res.send({url: signedUrl})
    } catch (error){
        console.log("error caught in app.ts: ", error)
        throw new Error(error as string);
    }
  })

app.post('/todo', async (req: any, res: any) => {
    res.header("Access-Control-Allow-Origin", "*");

    console.log("got into function")

    const command = new PutCommand({TableName: process.env.TABLE_NAME, Item: {
    pk: 'todo',
    sk: req.body.sk,
    title: req.body.title,
    description: req.body.description,
    completed: 'false'
}})

console.log("tablename: ", process.env.TABLE_NAME)

const getCommand = new GetCommand({
    TableName: process.env.TABLE_NAME,
    Key:{
        pk: 'todo',
        sk: req.body.sk
    }
})

try {
    const putRequest = await documentClient.send(command)
    console.log('returned from put request: ', putRequest)
    
    const getRequest = await documentClient.send(getCommand)

    console.log("returned from function: ", getRequest)
    res.header("Access-Control-Allow-Origin", "*");
    return res.status(200).json({todo: getRequest.Item});
    
} catch(error){
    console.log(error);
    return error;
}
})

  module.exports = app;