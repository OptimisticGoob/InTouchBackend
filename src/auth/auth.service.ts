
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/resources/user/entities/user.entity';
import { UserService } from 'src/resources/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = { username: user.name, sub: user.userID };
    return {
        access_token: this.jwtService.sign(payload, {
            secret: 'test',
            expiresIn: '60s'}),
    };
  }
}