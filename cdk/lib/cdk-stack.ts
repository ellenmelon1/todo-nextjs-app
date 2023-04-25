import * as cdk from 'aws-cdk-lib';
import { aws_iam } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as aws_s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'TodoListTable2', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
    });

    const UserUploadsBucket = new aws_s3.Bucket(this, 'TodoList2UserUploadsBucket', {
      versioned: true,
      cors: [
        {
          allowedHeaders: ['*'],
          allowedMethods: [aws_s3.HttpMethods.GET, aws_s3.HttpMethods.POST, aws_s3.HttpMethods.PUT, aws_s3.HttpMethods.DELETE],
          allowedOrigins: ['*'],
          exposedHeaders: ['ETag'],
          maxAge: 3000,
        },
      ],
      publicReadAccess:true,
    });

    const lambdaFunction = new lambda.Function(this, 'todolist2lambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('src'),
      handler: 'lambda.handler',
      environment: {
        BUCKET_NAME: process.env.BUCKET_NAME || 'env variable not set',
        TABLE_NAME: process.env.TABLE_NAME || 'env variable not set',
      },
  })

    const api = new apigateway.LambdaRestApi(this, 'todolist2api', {
      handler: lambdaFunction,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
    }});

    const userUploadsPolicy = new aws_iam.PolicyStatement({
      actions:['s3:GetObject','s3:PutObject', 's3:DeleteObject','s3:PostObject'],
      resources:
      [`${UserUploadsBucket.bucketArn}/*` || 'env variable not set']
    })

    const secondUserUploadsPolicy = new aws_iam.PolicyStatement({
      actions:['s3:GetObject','s3:PutObject', 's3:DeleteObject','s3:PostObject'],
      resources: [UserUploadsBucket.bucketArn || 'env variable not set']
    })

    lambdaFunction.role?.attachInlinePolicy(
      new aws_iam.Policy(this, 'uploadFilesPolicy',{
        statements:[userUploadsPolicy, secondUserUploadsPolicy]
      })
    )

    table.grantReadWriteData(lambdaFunction);
  } 
}
