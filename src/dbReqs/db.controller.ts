import { Controller, Get, Param, Put, Post, Body } from '@nestjs/common'
import { DbService } from 'src/dbService/db.service';
import { User } from 'src/models/models';
import { generateUserID } from 'src/util/util';

@Controller('db')
export class DbController {

    constructor(private readonly dbService: DbService){}
    
    @Get('user/:id')
    async getUser(@Param('id') id: String): Promise<String>{
        return await this.dbService.getUser(id);
    }


    @Get('users')
    async getUsers(): Promise<String> {
        return await this.dbService.getUsers();
    }


    @Post('user')
    async adduser(@Body() userObject: User): Promise<string> {
        userObject.UserID = generateUserID();
        return await this.dbService.createUser(userObject);
    }

    @Put('user')
    async updateUser(@Body() userObject: User): Promise<String>{
        return await this.dbService.updateUser(userObject)
    }

    @Put('test')
    async test(): Promise<String> {
        return await this.dbService.updateUser();
    }


    
}