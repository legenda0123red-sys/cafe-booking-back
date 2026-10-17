import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(body: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user) {
      throw new ConflictException('Пользователь с таким email уже существует!');
    }
    const hashedPass = await bcrypt.hash(body.password, 10);

    return this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPass,
        role: 'USER',
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPassValid = await bcrypt.compare(dto.password, user.password);

    if (!isPassValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token: access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async getMe(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        bookings: true,
      },
    });
  }

  async createAdmin(body: CreateUserDto) {
    const hashedPass = await bcrypt.hash(body.password, 10);
    return this.prisma.user.create({
      data: {
        name: body.name,
        password: hashedPass,
        email: body.email,
        role: 'ADMIN',
      },
    });
  }
}
