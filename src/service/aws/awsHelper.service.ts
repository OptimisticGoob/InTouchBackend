import { DynamoDBClient, GetItemCommand, ExecuteStatementCommand, UpdateItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { User, UserPost, UserUpdateInfo } from "src/models/models";
import { createPostInput } from "src/util/util";

@Injectable()
export class AwsHelperService{

    userTable = "Users";
    postTable = "Posts"
    postPrimaryKey = "PostID"
    userPrimaryKey = "UserID"
    client: DynamoDBClient;

    constructor(){
        this.client = new DynamoDBClient();
    }

    async awsGetUserInfo(userID: String): Promise<any>{
        const command = new GetItemCommand(this.getUserQuery(userID));
        const results =  await this.client.send(command);
        return results.Item;

    }

    async awsGetAllUsers(): Promise<any>{
        const input = {Statement: `SELECT * FROM ${this.userTable}`}
        const command = new ExecuteStatementCommand(input);
        const results = await this.client.send(command)
        return results.Items;
    }

    async awsUpdateUserInfo(user: User): Promise<any>{

        const updateInfo: UserUpdateInfo = this.getUserUpdateAttributes(user)

        const input = {
            TableName: this.userTable,
            Key: updateInfo.key,
            ExpressionAttributeValues: updateInfo.updateAttributeValues,
            UpdateExpression: updateInfo.updateExpression
        }

        const command = new UpdateItemCommand(input);
        const results =  await this.client.send(command);

        console.log(this.getUserUpdateAttributes(user))
        return results;
    }

    async awsCreateUser(user: User): Promise<any>{

        const input = {
            Item: this.createUserInput(user),
            TableName: this.userTable
        }


        const command = new PutItemCommand(input);
        const response = await this.client.send(command);

        return response;

    }

    async awsCreatePost(post: UserPost): Promise<any>{

        const input = {
            Item: createPostInput(post),
            TableName: this.postTable
        }


        const command = new PutItemCommand(input);
        const response = await this.client.send(command);
        return response;

    }

    getUserUpdateAttributes(user: User){
        let eav= {};
        let updateExpressionValues = "SET "
        let key = {UserID : { S: user.UserID}}


        for(var attributeName in user){
            if (
                user[attributeName] && 
                attributeName != this.userPrimaryKey
                ){
            eav[":"+attributeName] = { "S" : user[attributeName]}
            updateExpressionValues += attributeName + " = " + ":"+attributeName+", "
            }
        }
        return {updateAttributeValues: eav, updateExpression :updateExpressionValues.slice(0, -2), key: key };
    }

    createUserInput(user: User){

        let eav= {};

        for(var attributeName in user){
            if (user[attributeName]){
            eav[attributeName] = { "S" : user[attributeName]}
            }
        }

        return eav;
    }

    getUserQuery(userId: String): any{
        const userQuery = {
            Key: { UserID: { S: userId } },
            TableName: this.userTable
          }; 

        return (userQuery)
    }

    updateUserQuery(userId: String): any{
        const userQuery = {
            Key: { UserID: { S: userId } },
            TableName: this.userTable
          }; 

        return (userQuery)
    }
    
}