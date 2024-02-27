import { Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { dynamoDBClient } from 'src/aws-config/dynamodbClient';
import { v4 as uuid } from 'uuid';
import { String } from 'aws-sdk/clients/cloudtrail';
import { UpdateFeedDto } from './dto/update-feed.dto';


const FEEDS_TABLE="feeds"
@Injectable()
export class FeedService {
  async create(createFeedDto: CreateFeedDto) {
    return await dynamoDBClient()
    .put(
      {
        TableName: FEEDS_TABLE,
        Item :{
          userID: createFeedDto.userID,
          feedID: uuid(),
          posts: createFeedDto.posts,
          updated: createFeedDto.updated,
        }
      }
    ).promise();
  }

  async findAll() {
    const results = await dynamoDBClient()
      .scan({
        TableName: FEEDS_TABLE,
      }) .promise();
    
      return results.Items;
  }

 async findOne(userID: String ) {
    const result = await dynamoDBClient()
      .get({
        TableName: FEEDS_TABLE,
        Key: {userID}
      }).promise();

      return result.Item;
  }

  async update(feedID: string, updateFeedDto: UpdateFeedDto) {
    const query = generateUpdateExpression(updateFeedDto);
    console.log(query)
    const updated = await dynamoDBClient()
    .update({
      TableName: FEEDS_TABLE,
      Key: {feedID},
      UpdateExpression: query.UpdateExpression,
      ExpressionAttributeNames:query.ExpressionAttributeNames,
      ExpressionAttributeValues: query.ExpressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    }).promise();
    
    return updated.Attributes;
  }

  async remove(userID: string) {
    return await dynamoDBClient().delete({TableName: FEEDS_TABLE, Key: {userID},}).promise();;
  }
}


interface UpdateExpressionResult {
  UpdateExpression: string;
  ExpressionAttributeNames: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: any };
}

const generateUpdateExpression = (params: UpdateFeedDto): UpdateExpressionResult =>  {
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
