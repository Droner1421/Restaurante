import { IsString, MaxLength, MinLength, IsNumber, IsPositive, IsBoolean, IsOptional } from 'class-validator';

export class CreatePlatilloDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  id_restaurante?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  restauranteId?: number;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MaxLength(255)
  descripcion: string;

  @IsString()
  @MaxLength(50)
  categoria: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsBoolean()
  disponible: boolean;
}

