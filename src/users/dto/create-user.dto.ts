import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name?: string | null;
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  bio?: string | null;
  @IsString()
  password: string;
}
