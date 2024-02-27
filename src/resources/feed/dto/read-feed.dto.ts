import { IsArray, IsOptional, IsString } from "class-validator";

export class ReadFeedDto {

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


    constructor(partial: Partial<ReadFeedDto>) {
        Object.assign(this, partial)
    }


}