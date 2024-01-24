import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserPost } from 'src/models/models';
import { AwsHelperService } from 'src/service/aws/awsHelper.service';





@Injectable()
export class DbService {
  [x: string]: any;
  async getUser(id: String): Promise<string> {

    //"USER012345"
    const dynamoHelper = new AwsHelperService();
    const user = await dynamoHelper.awsGetUserInfo(id);

    if (!user) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUsers(): Promise<any>{
     const dynamoHelper = new AwsHelperService();
     const users = await dynamoHelper.awsGetAllUsers();

     if (!users){
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
     }

     return users;
  }

  async updateUser(user: User): Promise<string> {

//    const user: User = 
//    { 
//     UserID: "USER012345",
//     bio: "very nice bio describing a pleasant person",
//     displayName: "JosephDoeson"
//     }

    const dynamoHelper = new AwsHelperService();
    const update = await dynamoHelper.awsUpdateUserInfo(user);

    return update;

  }


  async createUser(user: User): Promise<string> {

    const dynamoHelper = new AwsHelperService();
    const create = await dynamoHelper.awsCreateUser(user);

    return create;
  }

  async createPost(post: UserPost): Promise<string> {

    const dynamoHelper = new AwsHelperService();
    const create = await dynamoHelper.awsCreatePost(post);

    return create;
  }
}