import { IsOptional, IsString, IsArray, IsEmail } from 'class-validator';
import { IUser } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements IUser {

    @ApiProperty()
    @IsString()
    userID: string;

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
    @IsOptional()
    bio?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    feed?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar?: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    following?: string[];

    @ApiProperty()
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    followers?: string[];

    @ApiProperty()
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    posts?: string[];

    @ApiProperty()
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    liked?: string[];

}
