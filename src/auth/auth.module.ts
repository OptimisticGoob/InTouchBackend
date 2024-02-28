
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/resources/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/resources/user/user.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
        secret: "test",
    })],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}