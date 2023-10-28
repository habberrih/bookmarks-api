import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from '../service/bookmark.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from '../dto';
import { GetCurrentUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Bookmarks')
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getBookmarks(@GetCurrentUser('id') userId: string) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @Param('id') bookmarkId: string,
    @GetCurrentUser('id') userId: string,
  ) {
    return this.bookmarkService.getBookmarkById(bookmarkId, userId);
  }

  @Post()
  addBookmark(
    @GetCurrentUser('id') userId: string,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.addBookmark(userId, createBookmarkDto);
  }

  @Patch(':id')
  updateBookmark(
    @Param('id') bookmarkId: string,
    @GetCurrentUser('id') userId: string,
    @Body() updateBookmark: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmark(
      userId,
      bookmarkId,
      updateBookmark,
    );
  }

  @Delete(':id')
  deleteBookmarkById(
    @Param('id') bookmarkId: string,
    @GetCurrentUser('id') userId: string,
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
