import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from './debt.entity';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([Debt]), ClientsModule],
  controllers: [DebtsController],
  providers: [DebtsService],
})
export class DebtsModule {}
