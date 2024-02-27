import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    
    @IsString()
    @IsOptional()
    name: string;
  
    
    @IsString()
    @IsOptional()
    password: string;
  
    
    @IsEmail()
    @IsOptional()
    email: string;

    
    @IsString()
    @IsOptional()
    bio: string;

    
    @IsString()
    @IsOptional()
    feed: string;

    
    @IsString()
    @IsOptional()
    avatar: string;

    
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    following: string[];

    
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    followers: string[];

    
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    posts: string[];

    
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    liked: string[];

}
