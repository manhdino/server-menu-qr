import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'dishes', schema: 'public' })
export default class DishesEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number

  @Column({ name: 'name', type: 'varchar', length: 256, nullable: true })
  name: string

  @Column({ type: 'numeric', nullable: true })
  price: number

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string

  @Column({ type: 'varchar', default: 'Available' })
  status: string

  // @OneToMany(() => DishSnapshot, (dishSnapshot) => dishSnapshot.dish)
  // dishSnapshots: DishSnapshot[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date
}
