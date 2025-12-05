import { IsString, MaxLength, MinLength, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateRestauranteDto {
	@IsString()
	@MinLength(3)
	@MaxLength(100)
	@IsOptional()
	nombre?: string;

	@IsString()
	@MinLength(3)
	@MaxLength(255)
	@IsOptional()
	direccion?: string;

	@IsString()
	@MinLength(7)
	@MaxLength(20)
	@IsOptional()
	telefono?: string;

	@IsString()
	@MaxLength(100)
	@IsOptional()
	horario?: string;

	@IsNumber()
	@IsPositive()
	@IsOptional()
	capacidad?: number;

	@IsString()
	@MinLength(3)
	@MaxLength(100)
	@IsOptional()
	gerente?: string;
}
