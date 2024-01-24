import { Injectable } from '@nestjs/common';
import { AwsHelperService } from './aws/awsHelper.service';


const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

@Injectable()
export class AppService {
  async getHello(): Promise<string> {

    // const dynamoHelper = new AwsHelperService();
    // const user = await dynamoHelper.awsGetUserInfo("USER012345");
    return "hello world";
  }

  async getTables(): Promise<any>{

 
      const client = new DynamoDBClient({ region: "us-east-1" });
      const command = new ListTablesCommand({});
      const results =  await client.send(command);

        return results;
     

  }
}
