"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentClient = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var config = {
    region: 'eu-west-2',
};
var dynamodbClient = new client_dynamodb_1.DynamoDBClient(config);
exports.documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(dynamodbClient);
