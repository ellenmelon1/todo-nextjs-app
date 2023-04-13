import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as aws_s3 from 'aws-cdk-lib/aws-s3';
import * as appsync from 'aws-cdk-lib/aws-appsync'
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
          allowedMethods: [aws_s3.HttpMethods.GET, aws_s3.HttpMethods.PUT, aws_s3.HttpMethods.POST, aws_s3.HttpMethods.DELETE],
          allowedOrigins: ['*'],
          exposedHeaders: ['ETag'],
          maxAge: 3000,
        },
      ],
      publicReadAccess:true,
    });

    const api=new appsync.GraphqlApi(this,'Api',{
      name:'todolist2-appsync-api',
      schema:appsync.SchemaFile.fromAsset('schema.graphql'),
      authorizationConfig:{
        defaultAuthorization:{
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: ToDoListUserPool,
            defaultAction: appsync.UserPoolDefaultAction.ALLOW,
        }
      }
    }})

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'demo',
      schema: appsync.SchemaFile.fromAsset(path.join(__dirname, 'schema.graphql')),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.IAM,
        },
      },
      xrayEnabled: true,
    });

    // Not needed since you are using AWS account credentials (set in the environment by running "activate.ts") to generate pre-signed URLs for the S3 bucket. Not an IAM principal or role.
    // const userUploadsBucketPolicy = new iam.PolicyStatement({
    //   effect: iam.Effect.ALLOW,
    //   actions: [
    //     's3:GetObject',
    //     's3:PutObject',
    //     's3:DeleteObject',
    //     's3:PostObject'
    //   ],
    //   resources: [
    //     `${process.env.BUCKET_NAME}/*`
    //   ]
    // });

    // UserUploadsBucket.addToResourcePolicy(userUploadsBucketPolicy);
  }
}
