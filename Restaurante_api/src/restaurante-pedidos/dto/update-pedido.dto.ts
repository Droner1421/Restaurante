import { IsNumber, IsPositive, IsString, MaxLength, MinLength, IsDateString, IsOptional } from 'class-validator';

export class UpdatePedidoDto {
	@IsNumber()
	@IsPositive()
	@IsOptional()
	id_restaurante?: number;

	@IsString()
	@IsDateString()
	@IsOptional()
	fecha?: string;

	@IsString()
	@MinLength(4)
	@MaxLength(8)
	@IsOptional()
	hora?: string;

	@IsString()
	@MaxLength(20)
	@IsOptional()
	mesa?: string;

	@IsNumber()
	@IsPositive()
	@IsOptional()
	total?: number;

	@IsString()
	@MaxLength(50)
	@IsOptional()
	metodo_pago?: string;

	@IsString()
	@MaxLength(20)
	@IsOptional()
	estatus?: string;
}
