import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetCurrentUser } from '../../auth/decorator';
import { JwtGuard } from '../../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetCurrentUser() user: User) {
    return user;
  }
}
