import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuid } from 'uuid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';


import { dynamoDBClient } from 'src/aws-config/dynamodbClient';
import { IUser } from './entities/user.entity';
import { DynamoDB } from 'aws-sdk';

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

// async findOneByEmail(email: string) {

//   const results = await dynamoDBClient()
//   .scan({
//     TableName: USERS_TABLE,
//   }) .promise();

//   const users = results.Items;
//   const user = users.filter( user => user.email === email)[0]
//   return user;

//   }

  async findOneByEmail(email: string) {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: USERS_TABLE,
      FilterExpression: "#email =  :email",
      ExpressionAttributeNames: {
          '#email': "email",
      },
      ExpressionAttributeValues: {
        ":email": email,
      }
  };

  try {
      const data = await dynamoDBClient().scan(params).promise();
      return data.Items[0];
  } catch (error) {
      console.error('Unable to scan user by email:', error);
      return null;
  }
  }
  
  async findOneByUserName(name: string) {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: USERS_TABLE,
      FilterExpression: "#name =  :name",
      ExpressionAttributeNames: {
          '#name': "name",
      },
      ExpressionAttributeValues: {
        ":name": name,
      }
  };
  

  try {
      const data = await dynamoDBClient().scan(params).promise();
      return data.Items[0];
  } catch (error) {
      console.error('Unable to scan user by email:', error);
      return null;
  }
  }

  async addFriend(userID: string, friendID: string) {

    try {
      const updateParams: DocumentClient.UpdateItemInput = {
        TableName: USERS_TABLE,
        Key: {  userID: userID },
        UpdateExpression: 'ADD friends :friendIdSet',
        ConditionExpression: 'attribute_exists(userID)',
        ExpressionAttributeValues: {
          ':friendIdSet': dynamoDBClient().createSet([friendID])
        },
        ReturnValues: 'NONE'
      };
  
      await dynamoDBClient().update(updateParams).promise();
      console.log('friend added successfully.');
    } catch (error) {
      console.error('Error adding friend:', error);
      throw error;
    }
  }

  async addPost(userID: string, postID: string) {

    try {
      const updateParams: DocumentClient.UpdateItemInput = {
        TableName: USERS_TABLE,
        Key: {  userID: userID },
        UpdateExpression: 'ADD posts :postIdSet',
        ConditionExpression: 'attribute_exists(userID)',
        ExpressionAttributeValues: {
          ':postIdSet': dynamoDBClient().createSet([postID])
        },
        ReturnValues: 'NONE'
      };
  
      await dynamoDBClient().update(updateParams).promise();
      console.log('post added successfully.');
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
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
