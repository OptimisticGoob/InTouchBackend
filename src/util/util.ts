import { Post, User } from "src/models/models";

export function generateUserID(): string {
    crypto = require("crypto");
    let result = "U";
    const uuid = require("uuid");
    result = result + uuid

    return result
}

export function createUserInput(user: User) {

    let eav = {};

    for (var attributeName in user) {
        if (user[attributeName]) {
            eav[attributeName] = { "S": user[attributeName] }
        }
    }

    return eav;
}


export function createPostInput(post: Post){


    const typeMap = new Map<string, string>([
        ["string", "S"]
    ]);


    let eav= {};


    for(var attributeName in post){
        if (post[attributeName]){
         let dynamoType = typeMap.get(post[attributeName]);
        eav[attributeName] = { dynamoType : post[attributeName]}
        }
    }

    return eav;
}