import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    
    @IsString()
    @IsOptional()
    postID: string;

    @IsString()
    @IsOptional()
    userID: string;

    @IsDate()
    @IsString()
    @IsOptional()
    creationdate: string;

    @IsDate()
    @IsString()
    @IsOptional()
    eventdate: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    location: string;

    @IsString()
    @IsOptional()
    title: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    attendees: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    likes: string[];

}
