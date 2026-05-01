import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from './debt.entity';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtsRepo: Repository<Debt>,
    private readonly clientsService: ClientsService,
  ) {}

  findAll(): Promise<Debt[]> {
    return this.debtsRepo.find({ order: { createdAt: 'DESC' } });
  }

  findByClient(clientId: string): Promise<Debt[]> {
    return this.debtsRepo.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Debt> {
    const debt = await this.debtsRepo.findOne({ where: { id } });
    if (!debt) throw new NotFoundException(`Debt ${id} not found`);
    return debt;
  }

  async create(dto: CreateDebtDto): Promise<Debt> {
    // Validates that the client exists
    await this.clientsService.findOne(dto.clientId);
    const debt = this.debtsRepo.create(dto);
    return this.debtsRepo.save(debt);
  }

  async update(id: string, dto: UpdateDebtDto): Promise<Debt> {
    const debt = await this.findOne(id);
    Object.assign(debt, dto);
    return this.debtsRepo.save(debt);
  }

  async remove(id: string): Promise<void> {
    const debt = await this.findOne(id);
    await this.debtsRepo.remove(debt);
  }
}
