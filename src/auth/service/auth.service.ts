import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { AuthDto } from '../dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login() {
    return 'I am logged in';
  }
  async signup(signUpCred: AuthDto): Promise<any> {
    const hashedPassword = await argon.hash(signUpCred.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: signUpCred.email,
        name: signUpCred.name,
        username: signUpCred.username,
        password: hashedPassword,
      },
    });

    delete newUser.password;
    return newUser;
  }
}
