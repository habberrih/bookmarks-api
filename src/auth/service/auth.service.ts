import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { SignupDto, LoginDto } from '../dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<object> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: loginDto.username,
      },
    });
    if (!user) throw new ForbiddenException('Credentials not found');

    const passwordMatched = await argon.verify(
      user.password,
      loginDto.password,
    );
    if (!passwordMatched) throw new ForbiddenException('Credentials not found');

    const token = await this.generateJwtToken(user.id, user.email);

    return {
      username: user.username,
      name: user.name,
      access_token: token,
    };
  }
  async signup(signUpCred: SignupDto): Promise<object> {
    const hashedPassword = await argon.hash(signUpCred.password);
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: signUpCred.email,
          name: signUpCred.name,
          username: signUpCred.username,
          password: hashedPassword,
        },
      });

      const token = await this.generateJwtToken(newUser.id, newUser.email);
      return {
        username: newUser.username,
        name: newUser.name,
        access_token: token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials are already taken.');
        }
      }
    }
    throw error;
  }

  generateJwtToken(userId: string, email: string): Promise<string> {
    const payload = {
      id: userId,
      email: email,
    };

    return this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET_KEY'),
      expiresIn: this.config.get('JWT_EXPIRESIN'),
    });
  }
}
