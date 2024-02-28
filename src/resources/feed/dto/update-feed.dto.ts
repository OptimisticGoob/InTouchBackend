import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedDto } from './create-feed.dto';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeedDto extends PartialType(CreateFeedDto) {

        @ApiProperty()
        @IsString()
        userID: string;
    
        @ApiProperty()
        @IsString()
        feedID: string;
      
        @ApiProperty()
        @IsArray()
        @IsString({each: true})
        posts: string[];
    
        @ApiProperty()
        @IsString()
        @IsDate()
        updated: string;
    
    
}
