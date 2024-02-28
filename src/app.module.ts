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
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [UserModule, PostModule, FeedModule, AuthModule],
  controllers: [AppController, UserController, PostController, FeedController, AuthController],
  providers: [AppService, JwtService, UserService, PostService, FeedService, AuthService],
})
export class AppModule { }
