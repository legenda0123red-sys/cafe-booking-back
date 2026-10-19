import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from './auth.guard';
import { ChangePasswordDto } from '../dto/update-user.dto';
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.auth.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.auth.login(body);
  }
  @UseGuards(JwtAuthGuard)
  @Post('create-admin')
  async createAdmin(@Body() body: CreateUserDto) {
    return this.auth.createAdmin(body);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getMe(
    @Req()
    req: Request & {
      user: {
        sub: number;
      };
    },
  ) {
    return this.auth.getMe(Number(req.user.sub));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-pass')
  async changePass(    @Req() req: AuthenticatedRequest,
    @Body() body: ChangePasswordDto) {
      return this.auth.changePass(req.user.id, body)
    }
}
