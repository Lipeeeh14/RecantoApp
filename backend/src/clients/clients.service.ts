import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepo: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientsRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException(`Client ${id} not found`);
    return client;
  }

  create(dto: CreateClientDto): Promise<Client> {
    const client = this.clientsRepo.create(dto);
    return this.clientsRepo.save(client);
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    Object.assign(client, dto);
    return this.clientsRepo.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await this.clientsRepo.remove(client);
  }
}
