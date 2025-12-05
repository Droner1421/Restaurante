import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Platillo } from './platillo.entity';
import { Pedido } from './pedido.entity';

@Entity('restaurante')
export class Restaurante {
  @PrimaryGeneratedColumn()
  id_restaurante: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  horario: string;

  @Column()
  capacidad: number;

  @Column()
  gerente: string;

  @OneToMany(() => Platillo, platillo => platillo.restaurante)
  platillos: Platillo[];

  @OneToMany(() => Pedido, pedido => pedido.restaurante)
  pedidos: Pedido[];
}
