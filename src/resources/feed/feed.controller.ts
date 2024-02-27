import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  async create(@Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(createFeedDto);
  }

  @Get()
  async findAll() {
    return this.feedService.findAll();
  }

  @Get(':userID')
  async findOne(
    @Param('userID') userID: string) 
    {
    return this.feedService.findOne(userID);
  }

  @Patch(':userID')
  async update(
  @Param('userID') userID: string, 
  @Body() updateFeedDto: UpdateFeedDto
  ) {
    return this.feedService.update(userID, updateFeedDto);
  }

  @Delete(':userID')
  async remove(@Param('userID') userID: string) {
    return this.feedService.remove(userID);
  }
}
