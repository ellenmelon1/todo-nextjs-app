"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoData = exports.getTodoIds = exports.listTodos = exports.getTodoS3Image = void 0;
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var dynamodbclient_1 = require("./dynamodbclient");
var client_s3_1 = require("@aws-sdk/client-s3");
var s3 = new client_s3_1.S3Client({ region: 'eu-west-2' });
var getTodoS3Image = function (s3Reference) { return __awaiter(void 0, void 0, void 0, function () {
    var command, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("bucket name: ", process.env.BUCKET_NAME);
                command = new client_s3_1.GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: s3Reference });
                return [4 /*yield*/, s3.send(command)];
            case 1:
                response = _a.sent();
                console.log(response.Body);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                throw new Error("Failed to fetch object from S3");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTodoS3Image = getTodoS3Image;
(0, exports.getTodoS3Image)('manu-schwendener-DSwBHyWKiVw-unsplash.jpg');
// const getObject = async (bucketName: string, objectKey: string) => {
//   try {
//     const command = new GetObjectCommand({ Bucket: bucketName, Key: objectKey });
//     const response = await s3.send(command);
//     return response.Body;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to fetch object from S3");
//   }
// };
var listTodos = function () { return __awaiter(void 0, void 0, void 0, function () {
    var command, data, todos, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                command = new lib_dynamodb_1.QueryCommand({
                    TableName: process.env.TABLE_NAME,
                    KeyConditionExpression: 'pk = :pk',
                    ExpressionAttributeValues: {
                        ':pk': 'todo'
                    }
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dynamodbclient_1.documentClient.send(command)];
            case 2:
                data = _b.sent();
                todos = ((_a = data.Items) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                    return {
                        id: item.sk,
                        title: item.title,
                        description: item.description,
                        completed: item.completed
                    };
                }));
                return [2 /*return*/, todos || []];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.listTodos = listTodos;
var getTodoIds = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.listTodos)()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.map(function (todo) {
                        return {
                            params: {
                                id: todo.id
                            }
                        };
                    })];
        }
    });
}); };
exports.getTodoIds = getTodoIds;
var getTodoData = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var command, response, _a, completed, title, description, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                command = new lib_dynamodb_1.GetCommand({
                    TableName: process.env.TABLE_NAME,
                    Key: {
                        pk: 'todo',
                        sk: id,
                    }
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dynamodbclient_1.documentClient.send(command)];
            case 2:
                response = _b.sent();
                _a = response.Item, completed = _a.completed, title = _a.title, description = _a.description;
                return [2 /*return*/, {
                        id: id,
                        completed: completed,
                        title: title,
                        description: description
                    }];
            case 3:
                error_3 = _b.sent();
                throw error_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTodoData = getTodoData;
