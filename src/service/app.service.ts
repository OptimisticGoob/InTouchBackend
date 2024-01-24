import { Injectable } from '@nestjs/common';
import { DynamoHelperService } from './aws/dynamoHelper.service';


const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

@Injectable()
export class AppService {
  async getHello(): Promise<string> {

    // const dynamoHelper = new AwsHelperService();
    // const user = await dynamoHelper.awsGetUserInfo("USER012345");
    return "hello world";
  }


}
