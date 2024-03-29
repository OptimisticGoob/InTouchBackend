import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }




    @Post('like')
    @HttpCode(HttpStatus.CREATED)
    async likePost(@Body() body: { postID: string, userID: string }) {
      const { postID, userID } = body;
     console.log(userID, postID)
     return this.postService.likePost(postID, userID);
    }
  
  
  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':postID')
  async findOne(@Param('postID') postID: string) {
    return this.postService.findOne(postID);
  }

  @Patch(':postID')
  async update(
  @Param('postID') postID: string, 
  @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postService.update(postID, updatePostDto);
  }

  @Delete(':postID')
  async remove(@Param('postID') postID: string) {
    return this.postService.remove(postID);
  }
}
