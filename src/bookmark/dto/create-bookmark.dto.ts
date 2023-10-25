import { IsNotEmpty, IsString } from 'class-validator';
import { GetCurrentUser } from 'src/auth/decorator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
