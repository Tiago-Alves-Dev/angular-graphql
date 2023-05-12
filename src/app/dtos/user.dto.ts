export interface UserDto {
  userId?: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  phone: string;
  image?: string;
}
