import { IsNumber, IsPositive, IsString, MaxLength, MinLength, IsDateString, IsOptional } from 'class-validator';

export class CreatePedidoDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  id_restaurante?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  restauranteId?: number;

  @IsString()
  @IsDateString()
  fecha: string;

  @IsString()
  @MinLength(4)
  @MaxLength(8)
  hora: string;

  @IsString()
  @MaxLength(20)
  mesa: string;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsString()
  @MaxLength(50)
  metodo_pago: string;

  @IsString()
  @MaxLength(20)
  estatus: string;
}
