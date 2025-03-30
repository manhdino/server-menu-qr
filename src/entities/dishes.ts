import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  
@Entity({ name: 'dishes', schema: 'public' })
export default class DishesEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;
  
    @Column({ name: 'name', type: 'varchar', length: 256, nullable: false })
    name: number;
}
  