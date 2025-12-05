import { IsString, MaxLength, MinLength, IsNumber, IsPositive, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePlatilloDto {
	@IsNumber()
	@IsPositive()
	@IsOptional()
	id_restaurante?: number;

	@IsString()
	@MinLength(3)
	@MaxLength(100)
	@IsOptional()
	nombre?: string;

	@IsString()
	@MaxLength(255)
	@IsOptional()
	descripcion?: string;

	@IsString()
	@MaxLength(50)
	@IsOptional()
	categoria?: string;

	@IsNumber()
	@IsPositive()
	@IsOptional()
	precio?: number;

	@IsBoolean()
	@IsOptional()
	disponible?: boolean;
}
