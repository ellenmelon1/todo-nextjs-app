import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const config = { 
    region: 'eu-west-2',
 };

 const marshallOptions = {
    removeUndefinedValues: true
}

const translateConfig = {marshallOptions}

const dynamodbClient = new DynamoDBClient(config);
export const documentClient = DynamoDBDocumentClient.from(dynamodbClient, translateConfig);