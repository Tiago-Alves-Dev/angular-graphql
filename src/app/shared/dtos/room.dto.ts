import { RomPeriodEnum } from '../enums/room-period.enum';
import { AuditDto } from './audit.dto';
import { StudentDto } from './student.dto';

export interface RoomDto extends AuditDto {
  roomId?: string;
  name: string;
  description: string;
  image?: string;
  period: RomPeriodEnum;
  hourStart?: string;
  hourEnd?: string;
  isActive?: boolean;
  students?: StudentDto[];
}
