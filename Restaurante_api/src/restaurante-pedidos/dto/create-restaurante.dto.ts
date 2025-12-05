import { IsString, MaxLength, MinLength, IsNumber, IsPositive } from 'class-validator';

export class CreateRestauranteDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  direccion: string;

  @IsString()
  @MinLength(7)
  @MaxLength(20)
  telefono: string;

  @IsString()
  @MaxLength(100)
  horario: string;

  @IsNumber()
  @IsPositive()
  capacidad: number;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  gerente: string;
}

