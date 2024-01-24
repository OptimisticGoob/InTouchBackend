import { User, UserPost } from "src/models/models";

export function generateID(prefix: string): string {
    crypto = require("crypto");
    let result = prefix;
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


export function createPostInput(post: UserPost){
    let eav= {};

    eav["PostID"] = { "S" : post.PostID};
    eav["UserID"] = { "S" : post.UserID};
    eav["title"] = { "S" : post.title};
    eav["body"] = { "S" : post.body};
    eav["picture"] = { "S" : post.picture};
    eav["likes"] = { "N" : post.likes};
    eav["date"] = { "S" : post.date};
    eav["tag"] = { "SS" : post.tag};

    return eav;
}