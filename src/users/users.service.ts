import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async createUsers(body: CreateUserDto) {
    const newUser = { ...body };
    return this.prisma.user.create({
      data: newUser,
    });
  }
  async getUserById(id: number) {
    const user = this.prisma.user.findUnique({ where: { id } });
    return user;
  }
  async updateUser(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
  async findOne(email: string){
    return this.prisma.user.findUnique({where: {email}})
  }
}
