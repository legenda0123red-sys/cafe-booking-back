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

import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ChangePasswordDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async getUsers() {
    return this.users.getUsers();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async createUsers(@Body() body: CreateUserDto) {
    return this.users.createUsers(body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('one/:id')
  async getUserById(@Param('id') id: string) {
    return this.users.getUserById(Number(id));
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ChangePasswordDto,
  ) {
    return this.users.updateUser(id, body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.users.deleteUser(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('find/:email')
  async findOne(@Param('email') email: string) {
    return this.users.findOne(email);
  }


}
