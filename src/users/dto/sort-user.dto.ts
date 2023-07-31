import { BaseUserDto } from './base-user.dto';

// import { Exclude } from 'class-transformer';
export class SortUserDto extends BaseUserDto {
  column: string;
  type: string;

  // @Exclude()
  // password: string;
}
