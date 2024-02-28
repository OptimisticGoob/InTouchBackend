import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':userID')
  async findOne(@Param('userID') userID: string) {
    return this.userService.findOne(userID);
  }

  @Get('/email/:email')
  async findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @HttpCode(201)
  @Patch(':userID')
  async update(
  @Param('userID') userID: string, 
  @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(userID, updateUserDto);
  }

  @Delete(':userID')
  async remove(@Param('userID') userID: string) {
    return this.userService.remove(userID);
  }
}
