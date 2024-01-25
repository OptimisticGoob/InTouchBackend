export interface User {
    UserID: string;
    bio?: string;
    displayName?: string;
    email?: string;
    phash?: string;
    phone?: string;
    picture?: string;
    standing?: string;
}

export interface UserUpdateInfo {
    updateAttributeValues: any;
    updateExpression: string;
    key: any;
}

export interface UserPost {
    UserID: string;
    PostID: string;
    title: string;
    body: string;
    picture: string;
    likes: string;
    date: string;
    tag?: string[];
}