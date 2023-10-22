import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { EditUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: string, editUserDto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { ...editUserDto },
      select: {
        email: true,
        name: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }
}
