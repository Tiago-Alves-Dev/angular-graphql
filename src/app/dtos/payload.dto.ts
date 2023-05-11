import { UserDto } from './user.dto';

export interface PayloadDto {
  user: UserDto;
  accessToken: string;
}
