import { Injectable } from '@nestjs/common';


const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return "hello world";
  }


}
