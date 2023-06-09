import { AuditDto } from './audit.dto';

export interface UserDto extends AuditDto {
  userId?: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  phone: string;
  image?: string;
}
