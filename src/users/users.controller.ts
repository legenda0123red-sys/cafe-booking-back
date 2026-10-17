import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getUsers() {
    return this.users.getUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createUsers(@Body() body: CreateUserDto) {
    return this.users.createUsers(body);
  }
  @UseGuards(JwtAuthGuard)
  @Get('one/:id')
  async getUserById(@Param('id') id: string) {
    return this.users.getUserById(Number(id));
  }
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.users.updateUser(id, body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.users.deleteUser(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('find/:email')
  async findOne(@Param('email') email: string) {
    return this.users.findOne(email);
  }
}
