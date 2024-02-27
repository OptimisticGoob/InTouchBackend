import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateFeedDto {

    @IsString()
    userID: string;

    @IsString()
    feedID: string;
  
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    posts: string[];

    @IsOptional()
    @IsString()
    updated: string;

}