import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsPositive,
  IsDateString,
  IsOptional,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateDebtDto {
  @IsUUID()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsBoolean()
  paid?: boolean;
}
