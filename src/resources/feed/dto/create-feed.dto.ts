import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateFeedDto {

    @ApiProperty({description:"unique user identifier"})
    @IsString()
    userID: string;

    @ApiProperty({description:"unique feed identifier"})
    @IsString()
    feedID: string;
  
    @ApiProperty({description:"array of post uuids"})
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    posts: string[];

    @ApiProperty({description:"changed when an operation on a feed occurs"})
    @IsOptional()
    @IsString()
    updated: string;

}