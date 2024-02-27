import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';


import { dynamoDBClient } from 'src/aws-config/dynamodbClient';

const USERS_TABLE="users"
@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return await dynamoDBClient()
    .put(
      {
        TableName: USERS_TABLE,
        Item :{
          userID: uuid(),
          password: createUserDto.password,
          email: createUserDto.email,
          bio: createUserDto.bio,
          following: createUserDto.following,
          followers: createUserDto.followers,
          posts: createUserDto.posts,
          liked: createUserDto.liked,
          avatar: createUserDto.avatar,
          feed: uuid(),
        }
      }
    ).promise();
  }

  async findAll() {
    const results = await dynamoDBClient()
      .scan({
        TableName: USERS_TABLE,
      }) .promise();
    
      return results.Items;
  }

 async findOne(userID: string) {
    const result = await dynamoDBClient()
      .get({
        TableName: USERS_TABLE,
        Key: {userID}
      }).promise();

      return result.Item;
  }

  async update(userID: string, updateUserDto: UpdateUserDto) {
    const query = generateUpdateExpression(updateUserDto);
    console.log(query)
    const updated = await dynamoDBClient()
    .update({
      TableName: USERS_TABLE,
      Key: {userID},
      UpdateExpression: query.UpdateExpression,
      ExpressionAttributeNames:query.ExpressionAttributeNames,
      ExpressionAttributeValues: query.ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    }).promise();
    
    return updated.Attributes;
  }

  async remove(userID: string) {
    return await dynamoDBClient().delete({TableName: USERS_TABLE, Key: {userID},}).promise();;
  }
}


interface UpdateExpressionResult {
  UpdateExpression: string;
  ExpressionAttributeNames: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: any };
}

const generateUpdateExpression = (params: UpdateUserDto): UpdateExpressionResult =>  {
  const expressions = [];
  const expressionAttributeNames: { [key: string]: string } = {};
  const expressionAttributeValues: { [key: string]: any } = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      const attributeName = `#${key}`;
      const attributeValue = `:${key}`;
      expressions.push(`${attributeName} = ${attributeValue}`);
      expressionAttributeNames[attributeName] = key;
      expressionAttributeValues[attributeValue] = value;
    }
  });

  const updateExpression = `SET ${expressions.join(', ')}`;
  return {
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  };
}
