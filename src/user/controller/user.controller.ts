import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetCurrentUser } from '../../auth/decorator';
import { JwtGuard } from '../../auth/guard';
import { EditUserDto } from '../dto';
import { UserService } from '../service/user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetCurrentUser() user: User) {
    return user;
  }

  @Patch(':id')
  editUser(
    @GetCurrentUser('id') userId: string,
    @Body() editUserDto: EditUserDto,
  ) {
    return this.userService.editUser(userId, editUserDto);
  }
}
