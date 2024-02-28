import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsDate } from 'class-validator';

export class ReadPostDto {

    @ApiProperty()
    @IsString()
    postID: string;
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
    @IsOptional()
    @IsString({each: true})
    attendees: string[];

    @ApiProperty()
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    likes: string[];

    constructor(partial: Partial<ReadPostDto>) {
        Object.assign(this, partial)
    }

}
