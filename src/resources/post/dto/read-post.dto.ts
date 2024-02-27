import { IsOptional, IsString, IsArray, IsDate } from 'class-validator';

export class ReadPostDto {

    @IsString()
    postID: string;
    @IsString()
    userID: string;

    @IsDate()
    @IsString()
    creationdate: string;

    @IsDate()
    @IsString()
    eventdate: string;

    @IsString()
    username: string;
  
    @IsString()
    description: string;

    @IsString()
    location: string;

    @IsString()
    title: string;

    @IsArray()
    @IsOptional()
    @IsString({each: true})
    attendees: string[];

    @IsArray()
    @IsOptional()
    @IsString({each: true})
    likes: string[];

    constructor(partial: Partial<ReadPostDto>) {
        Object.assign(this, partial)
    }

}
