import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    
    @ApiProperty()
    @IsString()
    postID: string;

    @ApiProperty()
    @IsString()
    userID: string;

    @ApiProperty()
    @IsDate()
    @IsString()
    creationdate: string;

    @ApiProperty()
    @IsDate()
    @IsString()
    eventdate: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    location: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    attendees: string[];

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    likes: string[];

}
