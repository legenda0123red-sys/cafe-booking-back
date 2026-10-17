import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTableDto } from '../dto/create-table.dto';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll() {
    return this.prisma.table.findMany();
  }

  async createTable(body: CreateTableDto) {
    const newTable = { ...body };

    return this.prisma.table.create({
      data: newTable,
    });
  }

  async getByNumber(number: number) {
    const table = await this.prisma.table.findUnique({ where: { number } });
    
    if (!table) {
      throw new NotFoundException('Ошибка, столик не найден');
    }

    return table;
  }

  async deleteTable(id: number) {
    return this.prisma.table.delete({ where: { id } });
  }
}
