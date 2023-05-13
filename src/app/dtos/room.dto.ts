import { AuditDto } from '../shared/dtos/audit.dto';
import { RomPeriodEnum } from '../shared/enums/room-period.enum';
import { StudentDto } from './student.dto';

export interface RoomDto extends AuditDto {
  roomId?: string;
  name: string;
  description: string;
  image?: string;
  period: RomPeriodEnum;
  hourStart?: string;
  hourEnd?: string;
  isActive: boolean;
  students?: StudentDto[];
}
