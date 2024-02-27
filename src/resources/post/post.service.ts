import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';


import { dynamoDBClient } from 'src/aws-config/dynamodbClient';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

const POSTS_TABLE="posts"
@Injectable()
export class PostService {
  async create(createPostDto: CreatePostDto) {
    return await dynamoDBClient()
    .put(
      {
        TableName: POSTS_TABLE,
        Item :{
          postID: uuid(),
          userID: createPostDto.userID,
          creationdate: new Date().toISOString(),
          username: createPostDto.username,
          description: createPostDto.description,
          location: createPostDto.location,
          eventdate: createPostDto.eventdate,
          likes: createPostDto.likes,
          title: createPostDto.title
          
        }
      }
    ).promise();
  }

  async findAll() {
    const results = await dynamoDBClient()
      .scan({
        TableName: POSTS_TABLE,
      }) .promise();
    
      return results.Items;
  }

 async findOne(postID: string) {
    const result = await dynamoDBClient()
      .get({
        TableName: POSTS_TABLE,
        Key: {postID}
      }).promise();

      return result.Item;
  }

  async update(postID: string, updatePostDto: UpdatePostDto) {
    const query = generateUpdateExpression(updatePostDto);
    console.log(query)
    const updated = await dynamoDBClient()
    .update({
      TableName: POSTS_TABLE,
      Key: {postID},
      UpdateExpression: query.UpdateExpression,
      ExpressionAttributeNames:query.ExpressionAttributeNames,
      ExpressionAttributeValues: query.ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    }).promise();
    
    return updated.Attributes;
  }

  async remove(postID: string) {
    return await dynamoDBClient().delete({TableName: POSTS_TABLE, Key: {postID},}).promise();;
  }
}


interface UpdateExpressionResult {
  UpdateExpression: string;
  ExpressionAttributeNames: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: any };
}

const generateUpdateExpression = (params: UpdatePostDto): UpdateExpressionResult =>  {
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
