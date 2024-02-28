import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class ReadFeedDto {

    @ApiProperty()
    @IsString()
    userID: string;

    @ApiProperty()
    @IsString()
    feedID: string;
  
    @ApiProperty()
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    posts: string[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    updated: string;


    constructor(partial: Partial<ReadFeedDto>) {
        Object.assign(this, partial)
    }


}