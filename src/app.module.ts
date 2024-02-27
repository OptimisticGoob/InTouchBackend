import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './resources/user/user.controller';
import { UserService } from './resources/user/user.service';
import { PostModule } from './resources/post/post.module';
import { PostController } from './resources/post/post.controller';
import { PostService } from './resources/post/post.service';
import { FeedModule } from './resources/feed/feed.module';
import { FeedController } from './resources/feed/feed.controller';
import { FeedService } from './resources/feed/feed.service';
import { UserModule } from './resources/user/user.module';
import { AppService } from './service/app.service';

@Module({
  imports: [UserModule, PostModule, FeedModule],
  controllers: [AppController, UserController, PostController, FeedController],
  providers: [AppService, JwtService, UserService, PostService, FeedService],
})
export class AppModule { }
