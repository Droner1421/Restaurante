import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurante } from './restaurante.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Restaurante, restaurante => restaurante.pedidos, { onDelete: 'CASCADE' })
  restaurante: Restaurante;

  @Column()
  fecha: string;

  @Column()
  hora: string;

  @Column()
  mesa: string;

  @Column('decimal')
  total: number;

  @Column()
  metodo_pago: string;

  @Column()
  estatus: string;
}
