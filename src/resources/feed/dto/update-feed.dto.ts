import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedDto } from './create-feed.dto';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateFeedDto extends PartialType(CreateFeedDto) {

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
        @IsDate()
        updated: string;
    
    
}
