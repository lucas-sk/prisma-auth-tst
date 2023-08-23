import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

import { RegisterUserDto } from './dto/registerUserDto.dto';
import { SignInUserDto } from './dto/signInUserDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register({ password, email, bio, name }: RegisterUserDto) {
    const userWithSameEmail = await this.usersService.findOneByEmail(email);

    if (userWithSameEmail) {
      throw new ConflictException('Email already exists');
    }

    const passwordHashed = await hash(password, 6);

    const user = await this.usersService.create({
      email,
      password: passwordHashed,
      bio,
      name,
    });

    return {
      user,
    };
  }

  async signIn({ email, password }: SignInUserDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
