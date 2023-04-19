const express = require('express');
const {S3Client, PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3');
const  { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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

  module.exports = app;