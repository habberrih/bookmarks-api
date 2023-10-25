import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from '../dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: string) {
    return this.prisma.bookmark.findMany({ where: { userId: userId } });
  }

  async getBookmarkById(bookmarkId: string, userId: string) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId, userId: userId },
    });
    return bookmark;
  }

  async addBookmark(userId: string, createBookmarkDto: CreateBookmarkDto) {
    const newBookmark = await this.prisma.bookmark.create({
      data: { userId: userId, ...createBookmarkDto },
    });

    return newBookmark;
  }

  async updateBookmark(
    userId: string,
    bookmarkId: string,
    updateBookmarkDto: UpdateBookmarkDto,
  ) {
    const updateBookmark = await this.prisma.bookmark.update({
      where: { id: bookmarkId, AND: { userId: userId } },
      data: updateBookmarkDto,
    });

    return updateBookmark;
  }

  async deleteBookmarkById(userId: string, bookmarkId: string) {
    const deleted = await this.prisma.bookmark.delete({
      where: { id: bookmarkId, AND: { userId: userId } },
    });

    console.log(deleted);
    return deleted;
  }
}
