import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { DbService } from './dbService/db.service';
import { DbController } from './dbReqs/db.controller';
import { DynamoHelperService } from './service/aws/awsHelper.service';

@Module({
  imports: [],
  controllers: [AppController, DbController],
  providers: [AppService, DbService, DynamoHelperService],
})
export class AppModule {}
