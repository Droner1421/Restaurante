import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurante } from './restaurante.entity';

@Entity('platillo')
export class Platillo {
  @PrimaryGeneratedColumn()
  id_platillo: number;

  @ManyToOne(() => Restaurante, restaurante => restaurante.platillos, { onDelete: 'CASCADE' })
  restaurante: Restaurante;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  categoria: string;

  @Column('decimal')
  precio: number;

  @Column({ default: true })
  disponible: boolean;
}
