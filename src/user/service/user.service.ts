import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { EditUserDto } from '../dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        email: true,
      },
    });
  }
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

  async deleteUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return new NotFoundError('User not found');
    }
    return await this.prisma.user.delete({
      where: { ...user },
      select: {
        id: true,
        name: true,
        createdAt: true,
        username: true,
        updatedAt: true,
      },
    });
  }
}
