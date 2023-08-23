import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  bio?: string | null;
  @IsString()
  password: string;
}
