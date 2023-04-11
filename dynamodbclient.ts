import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const config = { 
    region: 'eu-west-2',
 };

const dynamodbClient = new DynamoDBClient(config);
export const documentClient = DynamoDBDocumentClient.from(dynamodbClient);