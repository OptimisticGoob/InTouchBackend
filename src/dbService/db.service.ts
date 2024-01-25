import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserPost } from 'src/models/models';
import { DynamoHelperService } from 'src/service/aws/dynamoHelper.service';


@Injectable()
export class DbService {
  dynamoHelper: DynamoHelperService;
  constructor(){
    this.dynamoHelper = new DynamoHelperService();
  }

  async getUser(id: String): Promise<string> {  
    const user = await this.dynamoHelper.awsGetUserInfo(id);
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUsers(): Promise<any> {
    const users = await this.dynamoHelper.awsGetAllUsers();
    if (!users) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async updateUser(user: User): Promise<string> {
    const update = await this.dynamoHelper.awsUpdateUserInfo(user);
    return update;
  }


  async createUser(user: User): Promise<string> {
    const create = await this.dynamoHelper.awsCreateUser(user);
    return create;
  }

  async createPost(post: UserPost): Promise<string> {
    const create = await this.dynamoHelper.awsCreatePost(post);
    return create;
  }
}