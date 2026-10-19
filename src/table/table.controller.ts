import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TableService } from './table.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateTableDto } from '../dto/create-table.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('table')
export class TableController {
  constructor(private readonly table: TableService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async getAll() {
    return this.table.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async createTable(@Body() body: CreateTableDto) {
    return this.table.createTable(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('one/:id')
  async getByNumber(@Param() number: string) {
    return this.table.getByNumber(Number(number));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async deleteTable(@Param() id: string) {
    return this.table.deleteTable(Number(id));
  }
}
