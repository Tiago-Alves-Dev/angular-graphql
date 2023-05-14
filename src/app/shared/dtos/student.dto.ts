import { AuditDto } from './audit.dto';
import { RoomDto } from './room.dto';

export interface StudentDto extends AuditDto {
  studentId?: string;
  roomId: string;
  registration: string;
  name: string;
  age: number;
  birth: Date;
  email: string;
  phone: string;
  mother: string;
  father: string;
  photo: string;
  cpf: string;
  address?: string;
  addressNumber?: string;
  addressComplement?: string;
  district?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  room?: RoomDto;
}
