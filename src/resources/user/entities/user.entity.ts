export interface IUser {
    userID: string;
    name: string;
    password: string;
    email: string;
    bio?: string;
    feed?: string;
    avatar?: string;
    following?: string[];
    followers?: string[];
    posts?: string[];
    liked?: string[];
}
