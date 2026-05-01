import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Get()
  findAll() {
    return this.debtsService.findAll();
  }

  @Get('client/:clientId')
  findByClient(@Param('clientId') clientId: string) {
    return this.debtsService.findByClient(clientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDebtDto) {
    return this.debtsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDebtDto) {
    return this.debtsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.debtsService.remove(id);
  }
}
