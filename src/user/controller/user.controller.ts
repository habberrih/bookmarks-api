import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetCurrentUser } from '../../auth/decorator';
import { JwtGuard } from '../../auth/guard';
import { EditUserDto } from '../dto';
import { UserService } from '../service/user.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetCurrentUser() user: User) {
    return user;
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Patch(':id')
  editUser(
    @GetCurrentUser('id') userId: string,
    @Body() editUserDto: EditUserDto,
  ) {
    return this.userService.editUser(userId, editUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
