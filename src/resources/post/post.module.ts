import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [PostController],
  providers: [PostService, UserService],
})
export class PostModule {}
