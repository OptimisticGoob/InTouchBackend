import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsString()
    password: string;
  
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    bio: string;

    @ApiProperty()
    @IsString()
    feed: string;

    @ApiProperty()
    @IsString()
    avatar: string;

    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    following: string[];

    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    followers: string[];

    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    posts: string[];

    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    liked: string[];

}
