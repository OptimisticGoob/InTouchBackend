import { IsOptional, IsString, IsArray, IsEmail } from 'class-validator';

export class ReadUserDto {


    @IsString()
    userID: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    bio: string;

    @IsString()
    @IsOptional()
    feed: string;

    @IsString()
    @IsOptional()
    avatar: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    following: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    followers: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    posts: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    liked: string[];

    constructor(partial: Partial<ReadUserDto>) {
        Object.assign(this, partial)
    }

}
